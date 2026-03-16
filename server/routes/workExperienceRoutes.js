import express from 'express';
import {
	createWorkExperience,
	copyWorkExperience,
	getWorkExperiences,
	getWorkExperienceById,
	updateWorkExperience,
	deleteWorkExperience,
} from '../controllers/workExperienceController.js';

const router = express.Router();

router.post('/', createWorkExperience);
router.post('/:id/copy', copyWorkExperience);
router.get('/', getWorkExperiences);
router.get('/:id', getWorkExperienceById);
router.put('/:id', updateWorkExperience);
router.delete('/:id', deleteWorkExperience);

export default router;
