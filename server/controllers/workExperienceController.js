import WorkExperience from '../models/workExperience.js';
import { badRequestError, notFoundError, internalServerError } from '../utils/errors.js';

export const createWorkExperience = async (req, res) => {
	try {
		const workExperience = new WorkExperience(req.body);
		await workExperience.save();
		res.status(201).json(workExperience);
	} catch (error) {
		return badRequestError(res, error.message);
	}
};

export const getWorkExperiences = async (req, res) => {
	try {
		const workExperiences = await WorkExperience.find().sort({ updatedAt: -1 });
		res.status(200).json(workExperiences);
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

export const getWorkExperienceById = async (req, res) => {
	try {
		const workExperience = await WorkExperience.findById(req.params.id);
		if (!workExperience) {
			return notFoundError(res, 'Work Experience not found');
		}
		res.status(200).json(workExperience);
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

export const updateWorkExperience = async (req, res) => {
	try {
		const workExperience = await WorkExperience.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!workExperience) {
			return notFoundError(res, 'Work Experience not found');
		}
		res.status(200).json(workExperience);
	} catch (error) {
		return badRequestError(res, error.message);
	}
};

export const deleteWorkExperience = async (req, res) => {
	try {
		const workExperience = await WorkExperience.findByIdAndDelete(req.params.id);
		if (!workExperience) {
			return notFoundError(res, 'Work Experience not found');
		}
		res.status(200).json({ message: 'Work Experience deleted successfully' });
	} catch (error) {
		return internalServerError(res, error.message);
	}
};
