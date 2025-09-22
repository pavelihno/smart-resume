import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema(
	{
		institution: {
			type: String,
			required: true,
		},
		educationLevel: {
			type: String,
			required: true,
		},
		degree: {
			type: String,
			required: true,
		},
		department: {
			type: String,
			required: true,
		},
		specialization: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: Date,
	},
	{ timestamps: true }
);

export default mongoose.model('Education', EducationSchema);
