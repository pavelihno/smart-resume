import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api';
import LinkForm from './LinkForm';

const CreateLinkForm = () => {
    const navigate = useNavigate();
    const [createSuccess, setCreateSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (formData) => {
        setErrors({});
        try {
            await api.post('/links', formData);
            setCreateSuccess(true);
            navigate('/links');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <LinkForm
            handleSubmit={handleSubmit}
            isSuccess={createSuccess}
            successMessage="Link created successfully!"
            submitButton="Create"
            errors={errors}
        />
    );
};

export default CreateLinkForm;