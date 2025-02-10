import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api';
import SkillForm from './SkillForm';

const CreateSkillForm = () => {
    const navigate = useNavigate();
    const [createSuccess, setCreateSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (formData) => {
        setErrors({});
        try {
            await api.post('/skills', formData);
            setCreateSuccess(true);
            navigate('/skills');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <SkillForm
            handleSubmit={handleSubmit}
            isSuccess={createSuccess}
            successMessage="Skill created successfully!"
            submitButton="Create"
            errors={errors}
        />
    );
};

export default CreateSkillForm;