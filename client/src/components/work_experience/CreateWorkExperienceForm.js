import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api';
import WorkExperienceForm from './WorkExperienceForm';

const CreateWorkExperienceForm = () => {
    const navigate = useNavigate();
    const [createSuccess, setCreateSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (formData) => {
        setErrors({});
        try {
            await api.post('/work-experiences', formData);
            setCreateSuccess(true);
            navigate('/work-experiences');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <WorkExperienceForm
            handleSubmit={handleSubmit}
            isSuccess={createSuccess}
            successMessage="Work experience created successfully!"
            submitButton="Create"
            errors={errors}
        />
    );
};

export default CreateWorkExperienceForm;