import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api';
import ProfileForm from './ProfileForm';

const CreateProfileForm = () => {
    const navigate = useNavigate();
    const [createSuccess, setCreateSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (formData) => {
        setErrors({});
        try {
            await api.post('/profiles', formData);
            setCreateSuccess(true);
            navigate('/profiles');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <ProfileForm
            handleSubmit={handleSubmit}
            isSuccess={createSuccess}
            successMessage="Profile created successfully!"
            submitButton="Create"
            errors={errors}
        />
    );
};

export default CreateProfileForm;