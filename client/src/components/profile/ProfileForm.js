import React, { useState, useEffect } from 'react';
import { Grid, TextField, IconButton, Typography, Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BaseForm from '../BaseForm';
import { api } from '../../api';

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
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Phone numbers (press Enter to add)"
                    name="newPhone"
                    value={formData.newPhone}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && formData.newPhone.trim() !== '') {
                        e.preventDefault();
                        setFormData(prevData => ({
                            ...prevData,
                            phoneNumbers: [...prevData.phoneNumbers, prevData.newPhone.trim()],
                            newPhone: ''
                        }));
                        }
                    }}
                />
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                {formData.phoneNumbers.map((phone, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="small" onClick={() =>
                        setFormData(prevData => ({
                        ...prevData,
                        phoneNumbers: prevData.phoneNumbers.filter((_, i) => i !== index)
                        }))
                    }>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body1" style={{ marginLeft: 8 }}>
                        {phone}
                    </Typography>
                    </li>
                ))}
                </ul>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Emails (press Enter to add)"
                    name="newEmail"
                    value={formData.newEmail}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && formData.newEmail.trim() !== '') {
                        e.preventDefault();
                        setFormData(prevData => ({
                            ...prevData,
                            emails: [...prevData.emails, prevData.newEmail.trim()],
                            newEmail: ''
                        }));
                        }
                    }}
                />
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                {formData.emails.map((email, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="small" onClick={() =>
                        setFormData(prevData => ({
                        ...prevData,
                        emails: prevData.emails.filter((_, i) => i !== index)
                        }))
                    }>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body1" style={{ marginLeft: 8 }}>
                        {email}
                    </Typography>
                    </li>
                ))}
                </ul>
            </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        multiple
                        options={linkOptions}
                        getOptionLabel={(option) => option.type}
                        value={linkOptions.filter(option => formData.links.includes(option._id))}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        onChange={(event, newValue) =>
                            setFormData(prevData => ({ ...prevData, links: newValue.map(item => item._id) }))
                        }
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Links" />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        multiple
                        options={workExpOptions}
                        getOptionLabel={(option) => `${option.position} (${option.company})`}
                        value={workExpOptions.filter(option => formData.workExperiences.includes(option._id))}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        onChange={(event, newValue) =>
                            setFormData(prevData => ({ ...prevData, workExperiences: newValue.map(item => item._id) }))
                        }
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Work Experiences" />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        multiple
                        options={educationOptions}
                        getOptionLabel={(option) => `${option.educationLevel} (${option.degree})`}
                        value={educationOptions.filter(option => formData.educations.includes(option._id))}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        onChange={(event, newValue) =>
                            setFormData(prevData => ({ ...prevData, educations: newValue.map(item => item._id) }))
                        }
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Educations" />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        multiple
                        options={skillOptions}
                        getOptionLabel={(option) => option?.title}
                        value={formData.skills.map(skillId => skillOptions.find(option => option?._id === skillId))}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        onChange={(event, newValue) =>
                            setFormData(prevData => ({ ...prevData, skills: newValue.map(item => item._id) }))
                        }
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Skills" />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        multiple
                        options={projectOptions}
                        getOptionLabel={(option) => option.title}
                        value={projectOptions.filter(option => formData.projects.includes(option._id))}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        onChange={(event, newValue) =>
                            setFormData(prevData => ({ ...prevData, projects: newValue.map(item => item._id) }))
                        }
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Projects" />
                        )}
                    />
                </Grid>
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