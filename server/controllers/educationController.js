import Education from '../models/education.js';
import { badRequestError, notFoundError, internalServerError } from '../utils/errors.js';

export const createEducation = async (req, res) => {
	try {
		const education = new Education(req.body);
		await education.save();
		res.status(201).json(education);
	} catch (error) {
		return badRequestError(res, error.message);
	}
};

export const getEducations = async (req, res) => {
	try {
		const educations = await Education.find().sort({ updatedAt: -1 });
		res.status(200).json(educations);
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

export const getEducationById = async (req, res) => {
	try {
		const education = await Education.findById(req.params.id);
		if (!education) {
			return notFoundError(res, 'Education not found');
		}
		res.status(200).json(education);
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

export const updateEducation = async (req, res) => {
	try {
		const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!education) {
			return notFoundError(res, 'Education not found');
		}
		res.status(200).json(education);
	} catch (error) {
		return badRequestError(res, error.message);
	}
};

export const deleteEducation = async (req, res) => {
	try {
		const education = await Education.findByIdAndDelete(req.params.id);
		if (!education) {
			return notFoundError(res, 'Education not found');
		}
		res.status(200).json({ message: 'Education deleted successfully' });
	} catch (error) {
		return internalServerError(res, error.message);
	}
};
