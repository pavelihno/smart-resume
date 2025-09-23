import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseList from '../BaseList';
import { api } from '../../api';

const EducationList = () => {
	const navigate = useNavigate();
	const [educations, setEducations] = useState([]);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const fetchEducations = async () => {
			try {
				const response = await api.get('/educations');
				setEducations(response.data);
			} catch (error) {
				setErrors(error.response.data);
			}
		};

		fetchEducations();
	}, []);

	const handleEdit = (id) => {
		navigate(`/educations/${id}`);
	};

	const handleDelete = async (id) => {
		try {
			await api.delete(`/educations/${id}`);
			setEducations(educations.filter((education) => education._id !== id));
		} catch (error) {
			setErrors(error.response.data);
		}
	};

	const columns = {
		institution: 'Institution',
		educationLevel: 'Education Level',
		degree: 'Degree',
		department: 'Department',
		specialization: 'Specialization',
		location: 'Location',
	};

	return (
		<BaseList
			title='Education'
			createLink='/educations/new'
			columns={columns}
			rows={educations}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
			sortKey='institution'
		/>
	);
};

export default EducationList;
