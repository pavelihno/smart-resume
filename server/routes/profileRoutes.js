import express from 'express';
import {
	createProfile,
	copyProfile,
	getProfiles,
	getProfileById,
	updateProfile,
	deleteProfile,
	getTemplates,
	generateProfilePDF,
	generateProfileTeX,
} from '../controllers/profileController.js';

const router = express.Router();

router.get('/', getProfiles);
router.get('/templates', getTemplates);
router.get('/:id', getProfileById);
router.get('/:id/pdf', generateProfilePDF);
router.get('/:id/tex', generateProfileTeX);
router.post('/', createProfile);
router.post('/:id/copy', copyProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

export default router;
