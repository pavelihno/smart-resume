import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api';
import ProjectForm from './ProjectForm';

const CreateProjectForm = () => {
    const navigate = useNavigate();
    const [createSuccess, setCreateSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (formData) => {
        setErrors({});
        try {
            await api.post('/projects', formData);
            setCreateSuccess(true);
            navigate('/projects');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <ProjectForm
            handleSubmit={handleSubmit}
            isSuccess={createSuccess}
            successMessage="Project created successfully!"
            submitButton="Create"
            errors={errors}
        />
    );
};

export default CreateProjectForm;