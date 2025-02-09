import { listTemplates } from '../utils/latex.js';

export const getTemplates = (req, res) => {
    try {
        const templates = listTemplates();
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};