import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import WorkExperienceForm from './WorkExperienceForm';
import { api } from '../../api';

const UpdateWorkExperienceForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [workExperience, setWorkExperience] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchWorkExperience = async () => {
            try {
                const response = await api.get(`/work-experiences/${id}`);
                setWorkExperience(response.data);
            } catch (error) {
                setErrors(error.response.data);
            }
        };

        fetchWorkExperience();
    }, [id]);

    const handleSubmit = async (formData) => {
        setErrors({});
        try {
            await api.put(`/work-experiences/${id}`, formData);
            setUpdateSuccess(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const handleDelete = async () => {
        setErrors({});
        try {
            await api.delete(`/work-experiences/${id}`);
            navigate('/work-experiences');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <WorkExperienceForm
            workExperience={workExperience}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            isSuccess={updateSuccess}
            successMessage="Work experience updated successfully!"
            submitButton="Update"
            errors={errors}
        />
    );
};

export default UpdateWorkExperienceForm;