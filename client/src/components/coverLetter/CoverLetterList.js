import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseList from '../BaseList';
import { api } from '../../api';

const formatSentDate = (dateString) => {
	if (!dateString) {
		return '';
	}
	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) {
		return '';
	}
	return date.toLocaleDateString();
};

const CoverLetterList = () => {
	const navigate = useNavigate();
	const [coverLetters, setCoverLetters] = useState([]);
	const [, setErrors] = useState({});

	useEffect(() => {
		const fetchCoverLetters = async () => {
			try {
				const response = await api.get('/cover-letters');
				setCoverLetters(response.data);
			} catch (error) {
				setErrors(error.response?.data || { message: 'Failed to load cover letters' });
			}
		};

		fetchCoverLetters();
	}, []);

	const rows = useMemo(
		() =>
			coverLetters.map((letter) => ({
				...letter,
				profileName: letter.profile?.name || '—',
				formattedSentAt: formatSentDate(letter.sentAt),
			})),
		[coverLetters]
	);

	const handleEdit = (id) => {
		navigate(`/cover-letters/${id}`);
	};

	const handleDelete = async (id) => {
		setErrors({});
		try {
			await api.delete(`/cover-letters/${id}`);
			setCoverLetters((prev) => prev.filter((letter) => letter._id !== id));
		} catch (error) {
			setErrors(error.response?.data || { message: 'Failed to delete cover letter' });
		}
	};

	const columns = {
		position: 'Position',
		company: 'Company',
		profileName: 'Profile',
		formattedSentAt: 'Sent',
		bodyFormat: 'Format',
	};

	return (
		<BaseList
			title='Cover Letters'
			createLink='/cover-letters/new'
			columns={columns}
			rows={rows}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default CoverLetterList;
