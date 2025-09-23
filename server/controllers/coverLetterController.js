import CoverLetter, { BODY_FORMATS } from '../models/coverLetter.js';
import Profile from '../models/profile.js';
import { TEMPLATE_CATEGORIES, listTemplates, generatePDF, escapeLatex } from '../utils/latex.js';
import { badRequestError, internalServerError, notFoundError } from '../utils/errors.js';

const decodeHtmlEntities = (value = '') => {
	return value
		.replace(/&nbsp;/gi, ' ')
		.replace(/&amp;/gi, '&')
		.replace(/&lt;/gi, '<')
		.replace(/&gt;/gi, '>')
		.replace(/&quot;/gi, '"')
		.replace(/&#39;/gi, "'")
		.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
		.replace(/&#([0-9]+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
};

const sanitizeFilenameSegment = (value = '') => {
	return value
		.replace(/[\\/:*?"<>|]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
};

const applyInlineTokens = (text) => {
	if (!text) {
		return '';
	}

	let output = text;

	const tokenHandlers = [
		{
			regex: /\[\[B\]\]([\s\S]*?)\[\[\/B\]\]/g,
			replacer: (inner) => `\\textbf{${applyInlineTokens(inner)}}`,
		},
		{
			regex: /\[\[I\]\]([\s\S]*?)\[\[\/I\]\]/g,
			replacer: (inner) => `\\textit{${applyInlineTokens(inner)}}`,
		},
		{
			regex: /\[\[U\]\]([\s\S]*?)\[\[\/U\]\]/g,
			replacer: (inner) => `\\underline{${applyInlineTokens(inner)}}`,
		},
	];

	for (const handler of tokenHandlers) {
		output = output.replace(handler.regex, (_, inner) => handler.replacer(inner));
	}

	output = output.replace(/\[\[A:([^\]]+)\]\]([\s\S]*?)\[\[\/A\]\]/g, (_, href, label) => {
		const safeHref = escapeLatex(href.trim());
		return `\\href{${safeHref}}{${applyInlineTokens(label)}}`;
	});

	return output;
};

const normalizePlainTextBlocks = (text) => {
	if (!text) {
		return [];
	}

	const normalized = text.replace(/\r\n/g, '\n');
	const lines = normalized.split('\n');

	const blocks = [];
	let paragraphLines = [];
	let listItems = [];
	let currentListEnv = null;

	const flushParagraph = () => {
		if (paragraphLines.length === 0) {
			return;
		}
		const content = paragraphLines.join(' ').replace(/\s+/g, ' ').trim();
		if (content) {
			blocks.push({ type: 'paragraph', content });
		}
		paragraphLines = [];
	};

	const flushList = () => {
		if (listItems.length === 0) {
			return;
		}
		blocks.push({ type: 'list', env: currentListEnv || 'itemize', items: [...listItems] });
		listItems = [];
	};

	for (const rawLine of lines) {
		const line = rawLine.trim();
		if (!line) {
			flushParagraph();
			flushList();
			currentListEnv = null;
			continue;
		}

		if (line === '[[UL_START]]') {
			flushParagraph();
			flushList();
			currentListEnv = 'itemize';
			continue;
		}

		if (line === '[[OL_START]]') {
			flushParagraph();
			flushList();
			currentListEnv = 'enumerate';
			continue;
		}

		if (line === '[[UL_END]]' || line === '[[OL_END]]') {
			flushList();
			currentListEnv = null;
			continue;
		}

		if (line.startsWith('[[LI]]')) {
			const content = line.replace(/^\[\[LI\]\]\s*/, '');
			if (!currentListEnv) {
				currentListEnv = 'itemize';
			}
			listItems.push(content);
			continue;
		}

		if ((line.startsWith('- ') || line.startsWith('* ') || /^\d+[).\s]/.test(line)) && !line.startsWith('[[')) {
			const env = line.startsWith('- ') || line.startsWith('* ') ? 'itemize' : 'enumerate';
			if (currentListEnv && currentListEnv !== env) {
				flushList();
			}
			if (!currentListEnv) {
				flushParagraph();
				currentListEnv = env;
			}
			const itemContent = env === 'itemize' ? line.slice(2) : line.replace(/^\d+[).\s]*/, '');
			listItems.push(itemContent.trim());
			continue;
		}

		if (currentListEnv) {
			flushList();
			currentListEnv = null;
		}

		paragraphLines.push(line);
	}

	flushParagraph();
	flushList();

	return blocks;
};

const convertBlocksToLatex = (blocks) => {
	const parts = [];

	for (const block of blocks) {
		if (block.type === 'paragraph') {
			const escaped = escapeLatex(block.content);
			parts.push(applyInlineTokens(escaped));
			continue;
		}

		if (block.type === 'list') {
			const items = block.items
				.map((item) => {
					const escapedItem = escapeLatex(item);
					return `\\item ${applyInlineTokens(escapedItem)}`;
				})
				.join('\n');
			parts.push(`\\begin{${block.env}}\n${items}\n\\end{${block.env}}`);
		}
	}

	return parts.join('\n\n');
};

const htmlToTokenizedText = (html) => {
	if (!html) {
		return '';
	}

	let result = html.replace(/\r\n/g, '\n');

	result = result.replace(/<\s*(strong|b)[^>]*>([\s\S]*?)<\s*\/\s*\1\s*>/gi, '[[B]]$2[[/B]]');
	result = result.replace(/<\s*(em|i)[^>]*>([\s\S]*?)<\s*\/\s*\1\s*>/gi, '[[I]]$2[[/I]]');
	result = result.replace(/<\s*u[^>]*>([\s\S]*?)<\s*\/\s*u\s*>/gi, '[[U]]$1[[/U]]');
	result = result.replace(
		/<a[^>]*href\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))[^>]*>([\s\S]*?)<\s*\/a\s*>/gi,
		(match, _full, href1, href2, href3, label) => {
			const href = href1 || href2 || href3 || '';
			return `[[A:${href.trim()}]]${label}[[/A]]`;
		}
	);

	result = result.replace(/<\s*br\s*\/?\s*>/gi, '\n');
	result = result.replace(/<\s*\/p\s*>/gi, '\n\n');
	result = result.replace(/<\s*p[^>]*>/gi, '');
	result = result.replace(/<\s*ol[^>]*>/gi, '\n[[OL_START]]\n');
	result = result.replace(/<\s*\/ol\s*>/gi, '\n[[OL_END]]\n');
	result = result.replace(/<\s*ul[^>]*>/gi, '\n[[UL_START]]\n');
	result = result.replace(/<\s*\/ul\s*>/gi, '\n[[UL_END]]\n');
	result = result.replace(/<\s*li[^>]*>/gi, '\n[[LI]] ');
	result = result.replace(/<\s*\/li\s*>/gi, '');
	result = result.replace(/<[^>]+>/g, '');

	return decodeHtmlEntities(result);
};

const convertBodyToLatex = (body, format = BODY_FORMATS.PLAIN) => {
	if (!body) {
		return '';
	}

	switch (format) {
		case BODY_FORMATS.HTML: {
			const tokenized = htmlToTokenizedText(body);
			const blocks = normalizePlainTextBlocks(tokenized);
			return convertBlocksToLatex(blocks);
		}
		case BODY_FORMATS.LATEX:
			return body;
		case BODY_FORMATS.PLAIN:
		default: {
			const blocks = normalizePlainTextBlocks(body);
			return convertBlocksToLatex(blocks);
		}
	}
};

const formatSentAt = (sentAt) => {
	if (!sentAt) {
		return '';
	}
	const date = sentAt instanceof Date ? sentAt : new Date(sentAt);
	if (Number.isNaN(date.getTime())) {
		return '';
	}
	const timeZone = process.env.TZ || 'UTC';
	return date.toLocaleDateString('default', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone,
	});
};

const addCoverLetterToProfile = async (profileId, coverLetterId) => {
	await Profile.findByIdAndUpdate(profileId, { $addToSet: { coverLetters: coverLetterId } });
};

const removeCoverLetterFromProfile = async (profileId, coverLetterId) => {
	await Profile.findByIdAndUpdate(profileId, { $pull: { coverLetters: coverLetterId } });
};

const buildTemplatePayload = async (coverLetterId) => {
	const coverLetter = await CoverLetter.findById(coverLetterId)
		.populate({
			path: 'profile',
			populate: {
				path: 'links',
			},
		})
		.lean();

	if (!coverLetter) {
		return null;
	}

	const { profile } = coverLetter;
	if (!profile) {
		throw new Error('Cover letter does not have an associated profile');
	}

	const profileData = {
		name: profile.name,
		title: profile.title,
		phoneNumbers: profile.phoneNumbers || [],
		emails: profile.emails || [],
		links: (profile.links || []).map((link) => ({ type: link.type, url: link.url })),
	};

	const letterData = {
		position: coverLetter.position,
		company: coverLetter.company,
		companyRecipient: coverLetter.companyRecipient,
		companyLocation: coverLetter.companyLocation,
		senderLocation: coverLetter.senderLocation,
		salutation: coverLetter.salutation,
		closing: coverLetter.closing,
		sentAt: formatSentAt(coverLetter.sentAt),
		body: {
			__raw: true,
			value: convertBodyToLatex(coverLetter.body, coverLetter.bodyFormat),
		},
	};

	return { profile: profileData, coverLetter: letterData };
};

export const createCoverLetter = async (req, res) => {
	try {
		const { profile: profileId } = req.body;
		if (!profileId) {
			return badRequestError(res, 'Profile is required for cover letter');
		}

		const profileExists = await Profile.exists({ _id: profileId });
		if (!profileExists) {
			return notFoundError(res, 'Profile not found');
		}

		const coverLetter = new CoverLetter(req.body);
		await coverLetter.save();
		await addCoverLetterToProfile(profileId, coverLetter._id);

		res.status(201).json(coverLetter);
	} catch (error) {
		return badRequestError(res, error.message);
	}
};

export const getCoverLetters = async (req, res) => {
	try {
		const filter = {};
		if (req.query.profile) {
			filter.profile = req.query.profile;
		}

		const coverLetters = await CoverLetter.find(filter)
			.populate({ path: 'profile', select: 'name title phoneNumbers emails' })
			.sort({ updatedAt: -1 });

		res.status(200).json(coverLetters);
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

export const getCoverLetterById = async (req, res) => {
	try {
		const coverLetter = await CoverLetter.findById(req.params.id).populate({
			path: 'profile',
			populate: { path: 'links' },
		});

		if (!coverLetter) {
			return notFoundError(res, 'Cover letter not found');
		}

		res.status(200).json(coverLetter);
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

export const updateCoverLetter = async (req, res) => {
	try {
		const coverLetter = await CoverLetter.findById(req.params.id);
		if (!coverLetter) {
			return notFoundError(res, 'Cover letter not found');
		}

		const originalProfileId = coverLetter.profile.toString();
		const nextProfileId = req.body.profile ? String(req.body.profile) : originalProfileId;

		if (nextProfileId !== originalProfileId) {
			const profileExists = await Profile.exists({ _id: nextProfileId });
			if (!profileExists) {
				return notFoundError(res, 'Profile not found');
			}
		}

		Object.assign(coverLetter, req.body);
		await coverLetter.save();

		if (nextProfileId !== originalProfileId) {
			await addCoverLetterToProfile(nextProfileId, coverLetter._id);
			await removeCoverLetterFromProfile(originalProfileId, coverLetter._id);
		}

		res.status(200).json(coverLetter);
	} catch (error) {
		return badRequestError(res, error.message);
	}
};

export const deleteCoverLetter = async (req, res) => {
	try {
		const coverLetter = await CoverLetter.findByIdAndDelete(req.params.id);
		if (!coverLetter) {
			return notFoundError(res, 'Cover letter not found');
		}

		await removeCoverLetterFromProfile(coverLetter.profile, coverLetter._id);

		res.status(200).json({ message: 'Cover letter deleted successfully' });
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

export const getCoverLetterTemplates = (req, res) => {
	try {
		const templates = listTemplates(TEMPLATE_CATEGORIES.LETTER);
		res.status(200).json(templates);
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

const generateCoverLetterFile = async (req, res, type) => {
	try {
		const { id } = req.params;
		const payload = await buildTemplatePayload(id);
		if (!payload) {
			return notFoundError(res, 'Cover letter not found');
		}

		const templateName = req.query.template || 'default';
		const documentPaths = await generatePDF(payload, TEMPLATE_CATEGORIES.LETTER, templateName);
		const { profile } = payload;
		const candidate = sanitizeFilenameSegment(profile.name) || 'cover-letter';
		const role = sanitizeFilenameSegment(payload.coverLetter.position) || 'application';
		const fileName = `${candidate}. ${role}.${type}`;
		const filePath = type === 'pdf' ? documentPaths.pdfPath : documentPaths.texPath;

		res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
		res.status(200).sendFile(filePath, (err) => {
			if (err) {
				return internalServerError(res, err.message);
			}
		});
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

export const generateCoverLetterPDF = (req, res) => generateCoverLetterFile(req, res, 'pdf');
export const generateCoverLetterTeX = (req, res) => generateCoverLetterFile(req, res, 'tex');
