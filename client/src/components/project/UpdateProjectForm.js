import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import { api } from '../../api';

const UpdateProjectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await api.get(`/projects/${id}`);
                setProject(response.data);
            } catch (error) {
                setErrors(error.response.data);
            }
        };

        fetchProject();
    }, [id]);

    const handleSubmit = async (formData) => {
        setErrors({});
        try {
            await api.put(`/projects/${id}`, formData);
            setUpdateSuccess(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const handleDelete = async () => {
        setErrors({});
        try {
            await api.delete(`/projects/${id}`);
            navigate('/projects');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <ProjectForm
            project={project}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            isSuccess={updateSuccess}
            successMessage="Project updated successfully!"
            submitButton="Update"
            errors={errors}
        />
    );
};

export default UpdateProjectForm;