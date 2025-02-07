import Profile from '../models/profile.js';
import { badRequestError, notFoundError, internalServerError } from '../utils/errors.js';

export const createProfile = async (req, res) => {
    try {
        const profile = new Profile(req.body);
        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        return badRequestError(res, error.message);
    }
};

export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('workExperiences educations skills projects');
        res.status(200).json(profiles);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id).populate('workExperiences educations skills projects');
        if (!profile) {
            return notFoundError(res, 'Profile not found');
        }
        res.status(200).json(profile);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!profile) {
            return notFoundError(res, 'Profile not found');
        }
        res.status(200).json(profile);
    } catch (error) {
        return badRequestError(res, error.message);
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) {
            return notFoundError(res, 'Profile not found');
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};