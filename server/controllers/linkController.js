import Link from '../models/link.js';
import { badRequestError, notFoundError, internalServerError } from '../utils/errors.js';

export const createLink = async (req, res) => {
    try {
        const link = new Link(req.body);
        await link.save();
        res.status(201).json(link);
    } catch (error) {
        return badRequestError(res, error.message);
    }
};

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find();
        res.status(200).json(links);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getLinkById = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) {
            return notFoundError(res, 'Link not found');
        }
        res.status(200).json(link);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const updateLink = async (req, res) => {
    try {
        const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!link) {
            return notFoundError(res, 'Link not found');
        }
        res.status(200).json(link);
    } catch (error) {
        return badRequestError(res, error.message);
    }
};

export const deleteLink = async (req, res) => {
    try {
        const link = await Link.findByIdAndDelete(req.params.id);
        if (!link) {
            return notFoundError(res, 'Link not found');
        }
        res.status(200).json({ message: 'Link deleted successfully' });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};