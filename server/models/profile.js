import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		phoneNumbers: [String],
		emails: [String],
		links: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Link',
			},
		],
		workExperiences: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'WorkExperience',
			},
		],
		educations: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Education',
			},
		],
		skills: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ProfileSkill',
			},
		],
		projects: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Project',
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model('Profile', ProfileSchema);
