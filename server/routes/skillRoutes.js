import express from 'express';
import {
	createSkill,
	copySkill,
	getSkills,
	getSkillById,
	updateSkill,
	deleteSkill,
} from '../controllers/skillController.js';

const router = express.Router();

router.post('/', createSkill);
router.post('/:id/copy', copySkill);
router.get('/', getSkills);
router.get('/:id', getSkillById);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);

export default router;
