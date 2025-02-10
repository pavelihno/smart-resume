import React, { useState, useEffect } from 'react';
import { Grid, TextField, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DeleteIcon from '@mui/icons-material/Delete';

import BaseForm from '../BaseForm';

const ProjectForm = ({ project, handleSubmit, handleDelete, isSuccess, successMessage, submitButton, errors }) => {
    const [formData, setFormData] = useState({
        title: project?.title || '',
        url: project?.url || '',
        description: project?.description || '',
        responsibilities: project?.responsibilities || [],
        startDate: project?.startDate || null,
        endDate: project?.endDate || null
    });

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title,
                url: project.url,
                description: project.description,
                responsibilities: project.responsibilities,
                startDate: project.startDate ? new Date(project.startDate) : null,
                endDate: project.endDate ? new Date(project.endDate) : null
            });
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (name, date) => {
        setFormData((prevData) => ({ ...prevData, [name]: date }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
    };

    return (
        <BaseForm
            title="Project"
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
                            fullWidth
                            label="URL"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Responsibilities (Press Enter to add)"
                            name="newResponsibility"
                            value={formData.newResponsibility || ''}
                            onChange={(e) => setFormData((prevData) => ({ ...prevData, newResponsibility: e.target.value }))}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        responsibilities: [...prevData.responsibilities, prevData.newResponsibility],
                                        newResponsibility: ''
                                    }));
                                }
                            }}
                        />
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {formData.responsibilities.map((resp, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => {
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                responsibilities: prevData.responsibilities.filter((_, i) => i !== index)
                                            }));
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <Typography variant="body2">{resp}</Typography>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                    <Grid item xs={12}>
                        <DatePicker
                            required
                            selected={formData.startDate}
                            onChange={(date) => handleDateChange('startDate', date)}
                            dateFormat="dd.MM.yyyy"
                            placeholderText="Start Date"
                            customInput={<TextField fullWidth required />}
                            locale="en-GB"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DatePicker
                            selected={formData.endDate}
                            onChange={(date) => handleDateChange('endDate', date)}
                            dateFormat="dd.MM.yyyy"
                            placeholderText="End Date"
                            customInput={<TextField fullWidth />}
                            locale="en-GB"
                        />
                    </Grid>
                </>
            }
            onSubmit={onSubmit}
            handleDelete={handleDelete}
            submitButton={submitButton}
            isSuccess={isSuccess}
            successMessage={successMessage}
            errors={errors}
        />
    );
};

export default ProjectForm;