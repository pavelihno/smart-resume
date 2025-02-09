import Profile from '../models/profile.js';
import ProfileSkill from '../models/profileSkill.js';
import Skill from '../models/skill.js';
import { badRequestError, notFoundError, internalServerError } from '../utils/errors.js';
import { generatePDF } from '../utils/latex.js';

const FILE_TYPE = {
    PDF: 'pdf',
    TEX: 'tex'
};

export const createProfile = async (req, res) => {
    try {
        const { skills, ...profileData } = req.body;

        // Empty profile without skills
        const profile = new Profile(profileData);
        await profile.save();

        // Add skills to profile
        if (skills && skills.length > 0) {
            for (const skillData of skills) {
                const { id: skillId, order } = skillData;
                const skill = await Skill.findById(skillId);
                if (!skill) {
                    throw new Error(`Skill with id ${skillId} not found`);
                }
                const profileSkill = new ProfileSkill({
                    profile: profile._id,
                    skill: skill._id,
                    order: order
                });
                await profileSkill.save();
                profile.skills.push(profileSkill._id);
            }
        }

        await profile.save();

        res.status(201).json(profile);
    } catch (error) {
        return badRequestError(res, error.message);
    }
};

export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('workExperiences educations skills projects links');
        res.status(200).json(profiles);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id).populate('workExperiences educations skills projects links');
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

const getSortedProfile = async (profileId) => {
    const profile = await Profile.findById(profileId)
        .populate('workExperiences educations projects links')
        .populate({
            path: 'skills',
            populate: {
                path: 'skill'
            }
        });
    if (!profile) {
        throw new Error('Profile not found');
    }

    if (!profile.workExperiences.length || !profile.educations.length || !profile.skills.length || !profile.projects.length || !profile.links.length) {
        throw new Error('Profile fields cannot be empty');
    }

    const sortedProfile = profile.toObject();
    sortedProfile.workExperiences.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    sortedProfile.educations.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    sortedProfile.projects.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    sortedProfile.skills.sort((a, b) => a.order - b.order);

    return sortedProfile;
};

const generateProfileFile = async (req, res, type) => {
    try {
        const sortedProfile = await getSortedProfile(req.params.id);
        const documentPaths = await generatePDF(sortedProfile);

        const filePath = type === FILE_TYPE.PDF ? documentPaths.pdfPath : documentPaths.texPath;

        res.setHeader('Content-Disposition', `attachment; filename="${sortedProfile.name}. ${sortedProfile.title}.${type}"`);
        res.status(200).sendFile(filePath, (err) => {
            if (err) {
                return internalServerError(res, err.message);
            }
        });
    } catch (error) {
        if (error.message === 'Profile not found') {
            return notFoundError(res, error.message);
        }
        return internalServerError(res, error.message);
    }
};

export const generateProfilePDF = (req, res) => generateProfileFile(req, res, FILE_TYPE.PDF);
export const generateProfileTeX = (req, res) => generateProfileFile(req, res, FILE_TYPE.TEX);
