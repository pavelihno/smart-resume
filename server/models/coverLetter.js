import mongoose from 'mongoose';

const COVER_LETTER_BODY_FORMATS = ['plain', 'html', 'latex'];

const CoverLetterSchema = new mongoose.Schema(
	{
		profile: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Profile',
			required: true,
		},
		position: {
			type: String,
			required: true,
			trim: true,
		},
		company: {
			type: String,
			required: true,
			trim: true,
		},
		companyRecipient: {
			type: String,
			trim: true,
		},
		companyLocation: {
			type: String,
			trim: true,
		},
		senderLocation: {
			type: String,
			required: true,
			trim: true,
		},
		salutation: {
			type: String,
			trim: true,
		},
		closing: {
			type: String,
			trim: true,
		},
		body: {
			type: String,
			required: true,
			trim: true,
		},
		bodyFormat: {
			type: String,
			enum: COVER_LETTER_BODY_FORMATS,
			default: 'plain',
		},
		sentAt: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

export const BODY_FORMATS = Object.freeze({
	PLAIN: 'plain',
	HTML: 'html',
	LATEX: 'latex',
});

export default mongoose.model('CoverLetter', CoverLetterSchema);
