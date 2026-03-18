import Skill from '../models/skill.js';
import { badRequestError, notFoundError, internalServerError } from '../utils/errors.js';

export const createSkill = async (req, res) => {
	try {
		const skill = new Skill(req.body);
		await skill.save();
		res.status(201).json(skill);
	} catch (error) {
		return badRequestError(res, error.message);
	}
};

export const copySkill = async (req, res) => {
	try {
		const originalSkill = await Skill.findById(req.params.id);
		if (!originalSkill) {
			return notFoundError(res, 'Skill not found');
		}

		const cloneData = originalSkill.toObject();
		cloneData.title = cloneData.title ? `${cloneData.title} (Copy)` : 'Skill (Copy)';
		delete cloneData._id;
		delete cloneData.createdAt;
		delete cloneData.updatedAt;

		const duplicatedSkill = new Skill(cloneData);
		await duplicatedSkill.save();

		return res.status(201).json(duplicatedSkill);
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

export const getSkills = async (req, res) => {
	try {
		const skills = await Skill.find().sort({ updatedAt: -1 });
		res.status(200).json(skills);
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

export const getSkillById = async (req, res) => {
	try {
		const skill = await Skill.findById(req.params.id);
		if (!skill) {
			return notFoundError(res, 'Skill not found');
		}
		res.status(200).json(skill);
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

export const updateSkill = async (req, res) => {
	try {
		const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!skill) {
			return notFoundError(res, 'Skill not found');
		}
		res.status(200).json(skill);
	} catch (error) {
		return badRequestError(res, error.message);
	}
};

export const deleteSkill = async (req, res) => {
	try {
		const skill = await Skill.findByIdAndDelete(req.params.id);
		if (!skill) {
			return notFoundError(res, 'Skill not found');
		}
		res.status(200).json({ message: 'Skill deleted successfully' });
	} catch (error) {
		return internalServerError(res, error.message);
	}
};
