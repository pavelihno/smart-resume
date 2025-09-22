// filepath: /projects/smart-resume/client/src/components/project/ProjectList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseList from '../BaseList';
import { api } from '../../api';

const ProjectList = () => {
	const navigate = useNavigate();
	const [projects, setProjects] = useState([]);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await api.get('/projects');
				setProjects(response.data);
			} catch (error) {
				setErrors(error.response.data);
			}
		};

		fetchProjects();
	}, []);

	const handleEdit = (id) => {
		navigate(`/projects/${id}`);
	};

	const handleDelete = async (id) => {
		try {
			await api.delete(`/projects/${id}`);
			setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
		} catch (error) {
			setErrors(error.response.data);
		}
	};

	const columns = {
		title: 'Title',
		url: 'URL',
		description: 'Description',
	};

	return (
		<BaseList
			title='Projects'
			createLink='/projects/new'
			columns={columns}
			rows={projects}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default ProjectList;
