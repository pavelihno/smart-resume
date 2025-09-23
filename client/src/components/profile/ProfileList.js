import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseList from '../BaseList';
import { api } from '../../api';

const ProfileList = () => {
	const navigate = useNavigate();
	const [profiles, setProfiles] = useState([]);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const fetchProfiles = async () => {
			try {
				const response = await api.get('/profiles');
				setProfiles(response.data);
			} catch (error) {
				setErrors(error.response.data);
			}
		};

		fetchProfiles();
	}, []);

	const handleEdit = (id) => {
		navigate(`/profiles/${id}`);
	};

	const handleDelete = async (id) => {
		try {
			await api.delete(`/profiles/${id}`);
			setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile._id !== id));
		} catch (error) {
			setErrors(error.response.data);
		}
	};

	const handleCopy = async (id) => {
		try {
			const response = await api.post(`/profiles/${id}/copy`);
			setProfiles((prevProfiles) => [...prevProfiles, response.data]);
		} catch (error) {
			setErrors(error.response.data);
		}
	};

	const columns = {
		title: 'Title',
		phoneNumbers: 'Phone Numbers',
		emails: 'Emails',
	};

	return (
		<BaseList
			title='Profiles'
			createLink='/profiles/new'
			columns={columns}
			rows={profiles}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
			handleCopy={handleCopy}
			sortKey='title'
		/>
	);
};

export default ProfileList;
