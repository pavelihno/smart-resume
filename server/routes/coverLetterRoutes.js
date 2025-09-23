import express from 'express';
import {
	createCoverLetter,
	getCoverLetters,
	getCoverLetterById,
	updateCoverLetter,
	deleteCoverLetter,
	getCoverLetterTemplates,
	generateCoverLetterPDF,
	generateCoverLetterTeX,
} from '../controllers/coverLetterController.js';

const router = express.Router();

router.get('/', getCoverLetters);
router.get('/templates', getCoverLetterTemplates);
router.get('/:id/pdf', generateCoverLetterPDF);
router.get('/:id/tex', generateCoverLetterTeX);
router.get('/:id', getCoverLetterById);
router.post('/', createCoverLetter);
router.put('/:id', updateCoverLetter);
router.delete('/:id', deleteCoverLetter);

export default router;
