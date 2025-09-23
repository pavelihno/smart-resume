import latex from 'node-latex';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const TEMPLATE_CATEGORIES = {
	RESUME: 'resume',
	LETTER: 'letter',
};

const TEMPLATE_FOLDER_PATH = path.join(__dirname, '../static/templates/');
const OUTPUT_TEX_PATH = path.join(__dirname, '../static/temp/output.tex');
const OUTPUT_PDF_PATH = path.join(__dirname, '../static/temp/output.pdf');

const NAMED_HTML_ENTITIES = {
	amp: '&',
	lt: '<',
	gt: '>',
	quot: '"',
	apos: "'",
	nbsp: ' ',
};

const isSafeString = (value) => {
	if (!value) {
		return false;
	}
	return value instanceof Handlebars.SafeString || value.constructor?.name === 'SafeString';
};

const decodeHtmlEntities = (text) => {
	if (typeof text !== 'string' || text.indexOf('&') === -1) {
		return text;
	}
	return text.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g, (match, entity) => {
		if (entity[0] === '#') {
			const isHex = entity[1]?.toLowerCase() === 'x';
			const codePoint = parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10);
			if (!Number.isNaN(codePoint)) {
				return String.fromCodePoint(codePoint);
			}
			return match;
		}
		const replacement = NAMED_HTML_ENTITIES[entity.toLowerCase()];
		return replacement !== undefined ? replacement : match;
	});
};

export const escapeLatex = (text) => {
	if (typeof text !== 'string') {
		return text;
	}
	const normalizedText = decodeHtmlEntities(text);
	return normalizedText
		.replace(/\\/g, '\\textbackslash{}')
		.replace(/%/g, '\\%')
		.replace(/#/g, '\\#')
		.replace(/\$/g, '\\$')
		.replace(/_/g, '\\_')
		.replace(/{/g, '\\{')
		.replace(/}/g, '\\}')
		.replace(/&/g, '\\&')
		.replace(/</g, '\\textless{}')
		.replace(/>/g, '\\textgreater{}')
		.replace(/\^/g, '\\textasciicircum{}')
		.replace(/~/g, '\\textasciitilde{}')
		.replace(/'/g, '\\textquotesingle{}');
};

const escapeData = (data) => {
	if (isSafeString(data)) {
		return data;
	}
	if (typeof data === 'string') {
		return new Handlebars.SafeString(escapeLatex(data));
	} else if (Array.isArray(data)) {
		return data.map(escapeData);
	} else if (typeof data === 'object' && data !== null) {
		if (data.__raw) {
			return new Handlebars.SafeString(data.value ?? '');
		}
		const escapedData = {};
		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				escapedData[key] = escapeData(data[key]);
			}
		}
		return escapedData;
	} else {
		return data;
	}
};

export const generatePDF = async (data, categoryName, templateName) => {
	// Read LaTeX template
	const templatePath = path.join(TEMPLATE_FOLDER_PATH, categoryName, `${templateName}.tex`);
	const templateContent = fs.readFileSync(templatePath, 'utf8');

	// Escape profile data
	const escapedData = escapeData(data);

	// Compile template using Handlebars
	const template = Handlebars.compile(templateContent);
	const latexContent = template(escapedData);

	// Save compiled LaTeX content to a .tex file
	fs.writeFileSync(OUTPUT_TEX_PATH, latexContent);

	// Write compiled PDF output to file
	const outputStream = fs.createWriteStream(OUTPUT_PDF_PATH);

	return new Promise((resolve, reject) => {
		const pdfStream = latex(latexContent);
		pdfStream.pipe(outputStream);

		pdfStream.on('error', (err) => {
			reject(err);
		});

		outputStream.on('error', (err) => {
			reject(err);
		});

		outputStream.on('finish', () => {
			console.log('PDF successfully generated');
			resolve({ pdfPath: OUTPUT_PDF_PATH, texPath: OUTPUT_TEX_PATH });
		});
	});
};

export const listTemplates = (categoryName) => {
	const categoryFolderPath = path.join(TEMPLATE_FOLDER_PATH, categoryName);
	const templateFiles = fs.readdirSync(categoryFolderPath);
	return templateFiles.map((file) => path.basename(file, '.tex'));
};
