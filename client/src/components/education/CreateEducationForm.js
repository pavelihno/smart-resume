import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api';
import EducationForm from './EducationForm';

const CreateEducationForm = () => {
    const navigate = useNavigate();
    const [createSuccess, setCreateSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (formData) => {
        setErrors({});
        try {
            await api.post('/api/educations', formData);
            setCreateSuccess(true);
            navigate('/');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <EducationForm
            onSubmit={handleSubmit}
            isSuccess={createSuccess}
            successMessage="Education created successfully!"
            submitButton="Create"
        />
    );
};

export default CreateEducationForm;