import express from 'express';
import { createProfile, copyProfile, getProfiles, getProfileById, updateProfile, deleteProfile, generateProfilePDF, generateProfileTeX } from '../controllers/profileController.js';

const router = express.Router();

router.post('/', createProfile);
router.post('/:id/copy', copyProfile);
router.get('/', getProfiles);
router.get('/:id', getProfileById);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);
router.get('/:id/pdf', generateProfilePDF);
router.get('/:id/tex', generateProfileTeX);

export default router;