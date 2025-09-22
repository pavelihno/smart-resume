import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../api';

const BaseCreateForm = ({ formComponent: FormComponent, endpoint, redirectRoute, successMessage, submitButton }) => {
	const navigate = useNavigate();
	const [createSuccess, setCreateSuccess] = useState(false);
	const [errors, setErrors] = useState({});

	const handleSubmit = async (formData) => {
		setErrors({});
		try {
			await api.post(endpoint, formData);
			setCreateSuccess(true);
			navigate(redirectRoute);
		} catch (error) {
			setErrors(error.response.data);
		}
	};

	return (
		<FormComponent
			handleSubmit={handleSubmit}
			isSuccess={createSuccess}
			successMessage={successMessage}
			submitButton={submitButton}
			errors={errors}
		/>
	);
};

export default BaseCreateForm;
