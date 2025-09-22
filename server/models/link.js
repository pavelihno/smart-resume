import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Link', LinkSchema);
