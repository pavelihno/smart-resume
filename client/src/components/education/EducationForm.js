import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import BaseForm from '../BaseForm';

const EducationForm = ({ education, handleSubmit, handleDelete, isSuccess, successMessage, submitButton, errors }) => {
    const [formData, setFormData] = useState({
        institution: education?.institution || '',
        educationLevel: education?.educationLevel || '',
        degree: education?.degree || '',
        department: education?.department || '',
        specialization: education?.specialization || '',
        location: education?.location || '',
        startDate: education?.startDate || null,
        endDate: education?.endDate || null
    });

    useEffect(() => {
        if (education) {
            setFormData({
                institution: education.institution,
                educationLevel: education.educationLevel,
                degree: education.degree,
                department: education.department,
                specialization: education.specialization,
                location: education.location,
                startDate: education.startDate,
                endDate: education.endDate
            });
        }
    }, [education]);

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
            title={'Education'}
            formFields={<>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        label="Institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        label="Education Level"
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        label="Degree"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        label="Specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                    />
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
                    <Typography variant="body1" gutterBottom>
                        Start Date
                    </Typography>
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
                    <Typography variant="body1" gutterBottom>
                        End Date
                    </Typography>
                    <DatePicker
                        selected={formData.endDate}
                        onChange={(date) => handleDateChange('endDate', date)}
                        dateFormat="dd.MM.yyyy"
                        placeholderText="End Date"
                        customInput={<TextField fullWidth />}
                        locale="en-GB"
                    />
                </Grid>
            </>}
            onSubmit={onSubmit}
            handleDelete={handleDelete}
            submitButton={submitButton}
            isSuccess={isSuccess}
            successMessage={successMessage}
            errors={errors}
        />
    );
};

export default EducationForm;