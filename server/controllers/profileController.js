import Profile from '../models/profile.js';
import ProfileSkill from '../models/profileSkill.js';
import Skill from '../models/skill.js';
import { badRequestError, notFoundError, internalServerError } from '../utils/errors.js';
import { TEMPLATE_CATEGORIES, listTemplates, generatePDF } from '../utils/latex.js';

const FILE_TYPE = {
    PDF: 'pdf',
    TEX: 'tex'
};

const createProfileSkill = async (profileId, skillData) => {
    const { id: skillId, order } = skillData;
    const skill = await Skill.findById(skillId);
    if (!skill) {
        throw new Error(`Skill with id ${skillId} not found`);
    }
    const profileSkill = new ProfileSkill({
        profile: profileId,
        skill: skill._id,
        order: order
    });
    await profileSkill.save();
    return profileSkill._id;
};

export const createProfile = async (req, res) => {
    try {
        const { skills, ...profileData } = req.body;

        // Empty profile without skills
        const profile = new Profile(profileData);
        await profile.save();

        // Add skills to profile
        if (skills && skills.length > 0) {
            for (const [i, id] of skills.entries()) {
                const profileSkillId = await createProfileSkill(profile._id, { id: id, order: i+1 });
                profile.skills.push(profileSkillId);
            }
            await profile.save();
        }

        res.status(201).json(profile);
    } catch (error) {
        return badRequestError(res, error.message);
    }
};

export const copyProfile = async (req, res) => {
    try {
        const originalProfile = await Profile.findById(req.params.id).populate('workExperiences educations skills projects links');
        if (!originalProfile) {
            return notFoundError(res, 'Profile not found');
        }

        const newProfileData = originalProfile.toObject();
        newProfileData.title = `${newProfileData.title} (Copy)`;
        delete newProfileData._id;
        delete newProfileData.createdAt;
        delete newProfileData.updatedAt;
        delete newProfileData.skills;

        const newProfile = new Profile(newProfileData);
        await newProfile.save();

        for (const profileSkill of originalProfile.skills) {
            const profileSkillId = await createProfileSkill(
                newProfile._id, {id: profileSkill.skill._id, order: profileSkill.order}
            );
            newProfile.skills.push(profileSkillId);
        }
        await newProfile.save();

        res.status(201).json(newProfile);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().sort({ updatedAt: -1 });
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return notFoundError(res, 'Profile not found');
        }
        const { skills, ...profileData } = req.body;

        // Update profile data
        Object.assign(profile, profileData);

        // Update skills if provided
        if (skills && skills.length > 0) {

            // Delete existing profile skills
            await ProfileSkill.deleteMany({ profile: profile._id });

            profile.skills = [];
            for (const [i, id] of skills.entries()) {
                const profileSkillId = await createProfileSkill(profile._id, { id: id, order: i + 1 });
                profile.skills.push(profileSkillId);
            }
        }

        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        return badRequestError(res, error.message);
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const profileId = req.params.id
        const profile = await Profile.findByIdAndDelete(profileId);
        if (!profile) {
            return notFoundError(res, 'Profile not found');
        }

        // Delete associated profile skills
        await ProfileSkill.deleteMany({ profile: profileId });

        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getTemplates = (req, res) => {
    try {
        const templates = listTemplates(TEMPLATE_CATEGORIES.RESUME);
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFormattedProfile = async (profileId) => {
    const profile = await Profile.findById(profileId)
        .populate('workExperiences educations projects links')
        .populate({
            path: 'skills',
            populate: {
                path: 'skill'
            }
        });

    let formatedProfile = profile.toObject();
    
    // Sort work experiences, educations, projects and skills by start date and order
    formatedProfile.workExperiences.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    formatedProfile.educations.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    formatedProfile.projects.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    formatedProfile.skills.sort((a, b) => a.order - b.order);

    /*  
        Format dates
        Rules:
        - if the start and end are in the same year, keep only the end year
        - if the start and end are in the same month, keep only the month and year
        - if the end is missing, return 'Present' 
    */
    const getStartEndDates = (startDate, endDate) => {
        const startMonth = startDate.toLocaleString('default', { month: 'short' });
        const startYear = startDate.getFullYear();
        const endMonth = endDate ? endDate.toLocaleString('default', { month: 'short' }) : null;
        const endYear = endDate ? endDate.getFullYear() : null;

        if (!endDate) {
            return [`${startMonth} ${startYear}`, 'Present'];
        } else if (startYear === endYear) {
            if (startMonth === endMonth) {
                return [`${startMonth} ${startYear}`, null];
            }
            return [`${startMonth}`, `${endMonth} ${endYear}`];
        } else {
            return [`${startMonth} ${startYear}`, `${endMonth} ${endYear}`];
        }
    };

    const formatDates = (data) => {
        if (Array.isArray(data)) {
            return data.map(formatDates);
        } else if (typeof data === 'object' && data !== null) {
            const formattedData = {};
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key === 'startDate') {
                        const [startDate, endDate] = getStartEndDates(data.startDate, data.endDate);
                        formattedData.startDate = startDate;
                        formattedData.endDate = endDate;
                    } else if (key === 'endDate') {}
                    else {
                        formattedData[key] = formatDates(data[key]);
                    }
                }
            }
            return formattedData;
        } else {
            return data;
        }
    };

    formatedProfile = formatDates(formatedProfile);

    return formatedProfile;
};

const generateProfileFile = async (req, res, type) => {
    try {
        const profileId = req.params.id;
        const profile = await Profile.findById(profileId)
        if (!profile) {
            return notFoundError(res, 'Profile not found');
        }
        if (!profile.workExperiences.length || !profile.educations.length || !profile.skills.length || !profile.projects.length || !profile.links.length) {
            return badRequestError('Profile fields cannot be empty');
        }

        const formatedProfile = await getFormattedProfile(profileId);

        const documentPaths = await generatePDF(formatedProfile, TEMPLATE_CATEGORIES.RESUME, req.query.template);

        const filePath = type === FILE_TYPE.PDF ? documentPaths.pdfPath : documentPaths.texPath;

        res.setHeader('Content-Disposition', `attachment; filename="${formatedProfile.name}. ${formatedProfile.title}.${type}"`);
        res.status(200).sendFile(filePath, (err) => {
            if (err) {
                return internalServerError(res, err.message);
            }
        });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const generateProfilePDF = (req, res) => generateProfileFile(req, res, FILE_TYPE.PDF);
export const generateProfileTeX = (req, res) => generateProfileFile(req, res, FILE_TYPE.TEX);
