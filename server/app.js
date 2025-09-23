import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import profileRoutes from './routes/profileRoutes.js';
import workExperienceRoutes from './routes/workExperienceRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import linkRoutes from './routes/linkRoutes.js';
import coverLetterRoutes from './routes/coverLetterRoutes.js';

const connectDB = async () => {
	const MONGO_URI = `${process.env.MONGODB_URI}`;

	await mongoose
		.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Successfully connected to DB'))
		.catch((e) => {
			console.log(`Error while connecting to DB: ${e.message}`);
		});
};

const app = express();

app.use(express.json());
app.use(cors());

app.use('/profiles', profileRoutes);
app.use('/work-experiences', workExperienceRoutes);
app.use('/educations', educationRoutes);
app.use('/skills', skillRoutes);
app.use('/projects', projectRoutes);
app.use('/links', linkRoutes);
app.use('/cover-letters', coverLetterRoutes);

connectDB();

export default app;
