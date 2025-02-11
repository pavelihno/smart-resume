import mongoose from 'mongoose';

const WorkExperienceSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    domain: String,
    responsibilities: [String],
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: Date
}, { timestamps: true });

export default mongoose.model('WorkExperience', WorkExperienceSchema);