import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LinkForm from './LinkForm';
import { api } from '../../api';

const UpdateLinkForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [link, setLink] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const response = await api.get(`/links/${id}`);
                setLink(response.data);
            } catch (error) {
                setErrors(error.response.data);
            }
        };

        fetchLink();
    }, [id]);

    const handleSubmit = async (formData) => {
        setErrors({});
        try {
            await api.put(`/links/${id}`, formData);
            setUpdateSuccess(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const handleDelete = async () => {
        setErrors({});
        try {
            await api.delete(`/links/${id}`);
            navigate('/links');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <LinkForm
            link={link}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            isSuccess={updateSuccess}
            successMessage="Link updated successfully!"
            submitButton="Update"
            errors={errors}
        />
    );
};

export default UpdateLinkForm;