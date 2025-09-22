import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseList from '../BaseList';
import { api } from '../../api';

const WorkExperienceList = () => {
	const navigate = useNavigate();
	const [workExperiences, setWorkExperiences] = useState([]);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const fetchWorkExperiences = async () => {
			try {
				const response = await api.get('/work-experiences');
				setWorkExperiences(response.data);
			} catch (error) {
				setErrors(error.response.data);
			}
		};

		fetchWorkExperiences();
	}, []);

	const handleEdit = (id) => {
		navigate(`/work-experiences/${id}`);
	};

	const handleDelete = async (id) => {
		try {
			await api.delete(`/work-experiences/${id}`);
			setWorkExperiences((prevWorkExperiences) =>
				prevWorkExperiences.filter((workExperience) => workExperience._id !== id)
			);
		} catch (error) {
			setErrors(error.response.data);
		}
	};

	const columns = {
		position: 'Position',
		company: 'Company',
		domain: 'Domain',
		location: 'Location',
	};

	return (
		<BaseList
			title='Work Experience'
			createLink='/work-experiences/new'
			columns={columns}
			rows={workExperiences}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default WorkExperienceList;
