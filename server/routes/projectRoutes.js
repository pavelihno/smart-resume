import express from 'express';
import {
	createProject,
	copyProject,
	getProjects,
	getProjectById,
	updateProject,
	deleteProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.post('/', createProject);
router.post('/:id/copy', copyProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
