import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: String,
    description: String,
    responsibilities: [String],
    startDate: {
        type: Date,
        required: true
    },
    endDate: Date
});

export default mongoose.model('Project', ProjectSchema);