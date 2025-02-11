import React, { useState, useEffect } from 'react';
import { Grid, TextField, IconButton, Typography, Autocomplete } from '@mui/material';

import { api } from '../../api';
import BaseForm from '../BaseForm';
import TextFieldInput from '../../formFields/TextFieldInput';
import BulletedListField from '../../formFields/BulletedListField';
import MultiAutocompleteField from '../../formFields/MultiAutocompleteField';

const ProfileForm = ({ profile, handleSubmit, handleDelete, handleGeneratePdf, handleGenerateTex, isSuccess, successMessage, submitButton, errors, templates, selectedTemplate, handleTemplateChange }) => {

    const [formData, setFormData] = useState({
        title: profile?.title || '',
        name: profile?.name || '',
        phoneNumbers: profile?.phoneNumbers || [],
        newPhone: '',
        emails: profile?.emails || [],
        newEmail: '',
        links: profile?.links.map(link => link._id) || [],
        workExperiences: profile?.workExperiences || [],
        educations: profile?.educations || [],
        skills: profile?.skills || [],
        projects: profile?.projects || []
    });

    const [linkOptions, setLinkOptions] = useState([]);
    const [workExpOptions, setWorkExpOptions] = useState([]);
    const [educationOptions, setEducationOptions] = useState([]);
    const [skillOptions, setSkillOptions] = useState([]);
    const [projectOptions, setProjectOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const linksRes = await api.get('/links');
                setLinkOptions(linksRes.data);
            } catch (error) {
                console.error('Failed to fetch links', error);
            }
            try {
                const workExpRes = await api.get('/work-experiences');
                setWorkExpOptions(workExpRes.data);
            } catch (error) {
                console.error('Failed to fetch work experiences', error);
            }
            try {
                const educationsRes = await api.get('/educations');
                setEducationOptions(educationsRes.data);
            } catch (error) {
                console.error('Failed to fetch educations', error);
            }
            try {
                const skillsRes = await api.get('/skills');
                setSkillOptions(skillsRes.data);
            } catch (error) {
                console.error('Failed to fetch skills', error);
            }
            try {
                const projectsRes = await api.get('/projects');
                setProjectOptions(projectsRes.data);
            } catch (error) {
                console.error('Failed to fetch projects', error);
            }
        };
        fetchOptions();
    }, [profile]);

    useEffect(() => {
        if (profile) {
            setFormData({
                title: profile.title,
                name: profile.name,
                phoneNumbers: profile.phoneNumbers,
                newPhone: '',
                emails: profile.emails,
                newEmail: '',
                links: profile?.links.map(link => link._id),
                workExperiences: profile?.workExperiences.map(workExp => workExp._id),
                educations: profile?.educations.map(education => education._id),
                skills: profile?.skills.map(profileSkill => profileSkill.skill),
                projects: profile?.projects.map(project => project._id)
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        console.error(formData);
        console.error(skillOptions);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
    };

    return (
        <BaseForm
            title="Profile"
            formFields={
                <>
                    <TextFieldInput
                        required
                        fullWidth
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <TextFieldInput
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <BulletedListField 
                        formData={formData}
                        setFormData={setFormData}
                        label="Phone numbers"
                        itemsKey="phoneNumbers"
                        newItemKey="newPhone"
                        renderItem={(item) => item}
                    />
                    <BulletedListField 
                        formData={formData}
                        setFormData={setFormData}
                        label="Emails"
                        itemsKey="emails"
                        newItemKey="newEmail"
                        renderItem={(item) => item}
                    />
                    <MultiAutocompleteField
                        options={linkOptions}
                        getOptionLabel={(option) => option?.type}
                        value={formData.links.map(linkId => linkOptions.find(option => option?._id === linkId))}
                        onChange={(newValue) =>
                            setFormData(prevData => ({ ...prevData, links: newValue.map(item => item._id) }))
                        }
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        label="Links"
                    />
                    <MultiAutocompleteField
                        options={workExpOptions}
                        getOptionLabel={(option) => `${option?.position} (${option?.company})`}
                        value={formData.workExperiences.map(workExpId => workExpOptions.find(option => option?._id === workExpId))}
                        onChange={(newValue) =>
                            setFormData(prevData => ({ ...prevData, workExperiences: newValue.map(item => item._id) }))
                        }
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        label="Work Experiences"
                    />
                    <MultiAutocompleteField
                        options={educationOptions}
                        getOptionLabel={(option) => `${option?.educationLevel} (${option?.degree})`}
                        value={formData.educations.map(educationId => educationOptions.find(option => option?._id === educationId))}
                        onChange={(newValue) =>
                            setFormData(prevData => ({ ...prevData, educations: newValue.map(item => item._id) }))
                        }
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        label="Educations"
                    />
                    <MultiAutocompleteField
                        options={skillOptions}
                        getOptionLabel={(option) => option?.title}
                        value={formData.skills.map(skillId => skillOptions.find(option => option?._id === skillId))}
                        onChange={(newValue) =>
                            setFormData(prevData => ({ ...prevData, skills: newValue.map(item => item._id) }))
                        }
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        label="Skills"
                    />
                    <MultiAutocompleteField
                        options={projectOptions}
                        getOptionLabel={(option) => option?.title}
                        value={formData.projects.map(projectId => projectOptions.find(option => option._id === projectId))}
                        onChange={(newValue) =>
                            setFormData(prevData => ({ ...prevData, projects: newValue.map(item => item._id) }))
                        }
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        label="Projects"
                    />
                </>
            }
            onSubmit={onSubmit}
            handleDelete={handleDelete}
            handleGeneratePdf={handleGeneratePdf}
            handleGenerateTex={handleGenerateTex}
            submitButton={submitButton}
            isSuccess={isSuccess}
            successMessage={successMessage}
            errors={errors}
            templates={templates}
            selectedTemplate={selectedTemplate}
            handleTemplateChange={handleTemplateChange}
        />
    );
};

export default ProfileForm;