import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import SkillForm from './SkillForm';
import { api } from '../../api';

const UpdateSkillForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [skill, setSkill] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const response = await api.get(`/skills/${id}`);
                setSkill(response.data);
            } catch (error) {
                setErrors(error.response.data);
            }
        };

        fetchSkill();
    }, [id]);

    const handleSubmit = async (formData) => {
        setErrors({});
        try {
            await api.put(`/skills/${id}`, formData);
            setUpdateSuccess(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const handleDelete = async () => {
        setErrors({});
        try {
            await api.delete(`/skills/${id}`);
            navigate('/skills');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <SkillForm
            skill={skill}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            isSuccess={updateSuccess}
            successMessage="Skill updated successfully!"
            submitButton="Update"
            errors={errors}
        />
    );
};

export default UpdateSkillForm;