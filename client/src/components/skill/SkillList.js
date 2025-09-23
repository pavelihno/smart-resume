import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseList from '../BaseList';
import { api } from '../../api';

const SkillList = () => {
	const navigate = useNavigate();
	const [skills, setSkills] = useState([]);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const fetchSkills = async () => {
			try {
				const response = await api.get('/skills');
				setSkills(response.data);
			} catch (error) {
				setErrors(error.response.data);
			}
		};

		fetchSkills();
	}, []);

	const handleEdit = (id) => {
		navigate(`/skills/${id}`);
	};

	const handleDelete = async (id) => {
		try {
			await api.delete(`/skills/${id}`);
			setSkills((prevSkills) => prevSkills.filter((skill) => skill._id !== id));
		} catch (error) {
			setErrors(error.response.data);
		}
	};

	const columns = {
		title: 'Title',
		details: 'Details',
	};

	return (
		<BaseList
			title='Skills'
			createLink='/skills/new'
			columns={columns}
			rows={skills}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
			sortKey='title'
		/>
	);
};

export default SkillList;
