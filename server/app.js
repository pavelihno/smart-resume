import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import profileRoutes from './routes/profileRoutes.js';
import workExperienceRoutes from './routes/workExperienceRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import linkRoutes from './routes/linkRoutes.js';

const connectDB = async () => {
	const MONGO_URI = `mongodb://${process.env.MONGODB_ROOT_USER}:${process.env.MONGODB_ROOT_USER_PASSWORD}@mongo:${process.env.MONGODB_DOCKER_PORT}/${process.env.MONGODB_DATABASE}`;

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

connectDB();

export default app;
