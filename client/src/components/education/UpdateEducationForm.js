import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EducationForm from './EducationForm';
import api from '../../api';

const UpdateEducationForm = () => {
    const { id } = useParams();
    const [education, setEducation] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const response = await axios.get(`/api/educations/${id}`);
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
            await axios.put(`/api/educations/${id}`, formData);
            setUpdateSuccess(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <EducationForm
            education={education}
            onSubmit={handleSubmit}
            isSuccess={updateSuccess}
            successMessage="Education updated successfully!"
            submitButton="Update"
        />
    );
};

export default UpdateEducationForm;