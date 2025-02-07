import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: String,
    details: [String]
});

export default mongoose.model('Skill', SkillSchema);