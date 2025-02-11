import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import ProfileForm from './ProfileForm';
import { api } from '../../api';

const UpdateProfileForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await api.get('/options/templates');
                setTemplates(response.data);
                if (response.data.length > 0) {
                    setSelectedTemplate(response.data[0]);
                }
            } catch (error) {
                console.error('Failed to fetch templates', error);
            }
        };

        fetchTemplates();
    }, []);

    const handleTemplateChange = (templateName) => {
        setSelectedTemplate(templateName);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(`/profiles/${id}`);
                setProfile(response.data);
            } catch (error) {
                setErrors(error.response.data);
            }
        };

        fetchProfile();
    }, [id]);

    const handleSubmit = async (formData) => {
        setErrors({});
        try {
            await api.put(`/profiles/${id}`, formData);
            setUpdateSuccess(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const handleDelete = async () => {
        setErrors({});
        try {
            await api.delete(`/profiles/${id}`);
            navigate('/profiles');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const handleGenerateFile = async (fileType) => {
        setErrors({});
        try {
            const response = await api.get(`/profiles/${id}/${fileType}`, {
                params: { template: selectedTemplate },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${profile.name}.${fileType}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            if (error.response && error.response.data instanceof Blob) {
                const errorText = await error.response.data.text();
                try {
                    setErrors(JSON.parse(errorText));
                } catch (parseError) {
                    setErrors({ message: errorText });
                }
            } else {
                setErrors(error.response ? error.response.data : { message: error.message });
            }
        }
    };

    const handleGeneratePdf = () => handleGenerateFile('pdf');
    const handleGenerateTex = () => handleGenerateFile('tex');

    return (
        <ProfileForm
            profile={profile}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            handleGeneratePdf={() => handleGeneratePdf(selectedTemplate)}
            handleGenerateTex={() => handleGenerateTex(selectedTemplate)}
            isSuccess={updateSuccess}
            successMessage="Profile updated successfully!"
            submitButton="Update"
            errors={errors}
            templates={templates}
            selectedTemplate={selectedTemplate}
            handleTemplateChange={handleTemplateChange}
        />
    );
};

export default UpdateProfileForm;