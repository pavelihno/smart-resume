import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import BaseForm from '../BaseForm';

const WorkExperienceForm = ({ workExperience, handleSubmit, handleDelete, isSuccess, successMessage, submitButton, errors }) => {
    const [formData, setFormData] = useState({
        position: workExperience?.position || '',
        company: workExperience?.company || '',
        domain: workExperience?.domain || '',
        responsibilities: workExperience?.responsibilities || [],
        location: workExperience?.location || '',
        startDate: workExperience?.startDate || null,
        endDate: workExperience?.endDate || null
    });

    useEffect(() => {
        if (workExperience) {
            setFormData({
                position: workExperience.position,
                company: workExperience.company,
                domain: workExperience.domain,
                responsibilities: workExperience.responsibilities,
                location: workExperience.location,
                startDate: workExperience.startDate,
                endDate: workExperience.endDate
            });
        }
    }, [workExperience]);

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
            title="Work Experience"
            formFields={
                <>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Domain"
                            name="domain"
                            value={formData.domain}
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
                            {formData.responsibilities.map((responsibility, index) => (
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
                                    <Typography variant="body2">{responsibility}</Typography>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
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

export default WorkExperienceForm;