import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EducationForm from './EducationForm';
import { api } from '../../api';

const UpdateEducationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [education, setEducation] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const response = await api.get(`/educations/${id}`);
                setEducation(response.data);
            } catch (error) {
                setErrors(error.response.data);
            }
        };

        fetchEducation();
    }, [id]);

    const handleSubmit = async (formData) => {
        setErrors({});
        try {
            await api.put(`/educations/${id}`, formData);
            setUpdateSuccess(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const handleDelete = async () => {
        setErrors({});
        try {
            await api.delete(`/educations/${id}`);
            navigate('/educations');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <EducationForm
            education={education}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            isSuccess={updateSuccess}
            successMessage="Education updated successfully!"
            submitButton="Update"
            errors={errors}
        />
    );
};

export default UpdateEducationForm;