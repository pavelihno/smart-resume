import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumbers: [String],
    emails: [String],
    links: [String],
    workExperiences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkExperience'
    }],
    educations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Education'
    }],
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
});

export default mongoose.model('Profile', ProfileSchema);