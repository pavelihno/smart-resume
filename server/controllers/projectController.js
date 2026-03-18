import Project from '../models/project.js';
import { badRequestError, notFoundError, internalServerError } from '../utils/errors.js';

export const createProject = async (req, res) => {
	try {
		const project = new Project(req.body);
		await project.save();
		res.status(201).json(project);
	} catch (error) {
		return badRequestError(res, error.message);
	}
};

export const copyProject = async (req, res) => {
	try {
		const originalProject = await Project.findById(req.params.id);
		if (!originalProject) {
			return notFoundError(res, 'Project not found');
		}

		const cloneData = originalProject.toObject();
		cloneData.title = cloneData.title ? `${cloneData.title} (Copy)` : 'Project (Copy)';
		delete cloneData._id;
		delete cloneData.createdAt;
		delete cloneData.updatedAt;

		const duplicatedProject = new Project(cloneData);
		await duplicatedProject.save();

		return res.status(201).json(duplicatedProject);
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

export const getProjects = async (req, res) => {
	try {
		const projects = await Project.find().sort({ updatedAt: -1 });
		res.status(200).json(projects);
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

export const getProjectById = async (req, res) => {
	try {
		const project = await Project.findById(req.params.id);
		if (!project) {
			return notFoundError(res, 'Project not found');
		}
		res.status(200).json(project);
	} catch (error) {
		return internalServerError(res, error.message);
	}
};

export const updateProject = async (req, res) => {
	try {
		const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!project) {
			return notFoundError(res, 'Project not found');
		}
		res.status(200).json(project);
	} catch (error) {
		return badRequestError(res, error.message);
	}
};

export const deleteProject = async (req, res) => {
	try {
		const project = await Project.findByIdAndDelete(req.params.id);
		if (!project) {
			return notFoundError(res, 'Project not found');
		}
		res.status(200).json({ message: 'Project deleted successfully' });
	} catch (error) {
		return internalServerError(res, error.message);
	}
};
