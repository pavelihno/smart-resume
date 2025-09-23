import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseList from '../BaseList';
import { api } from '../../api';

const LinkList = () => {
	const navigate = useNavigate();
	const [links, setLinks] = useState([]);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const fetchLinks = async () => {
			try {
				const response = await api.get('/links');
				setLinks(response.data);
			} catch (error) {
				setErrors(error.response.data);
			}
		};

		fetchLinks();
	}, []);

	const handleEdit = (id) => {
		navigate(`/links/${id}`);
	};

	const handleDelete = async (id) => {
		try {
			await api.delete(`/links/${id}`);
			setLinks((prevLinks) => prevLinks.filter((link) => link._id !== id));
		} catch (error) {
			setErrors(error.response.data);
		}
	};

	const columns = {
		type: 'Type',
		url: 'URL',
	};

	return (
		<BaseList
			title='Links'
			createLink='/links/new'
			columns={columns}
			rows={links}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
			sortKey='type'
		/>
	);
};

export default LinkList;
