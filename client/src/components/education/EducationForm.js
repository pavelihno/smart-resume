import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, CssBaseline, Button, Box, Paper, Container, Alert } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import Base from '../Base';

const EducationForm = ({ education, onSubmit, isSuccess, successMessage, submitButton }) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Base>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Paper elevation={2} style={{ padding: '2rem' }}>
                    <Typography variant="h5" align="center" sx={{ textDecoration: 'underline', mb: '1rem' }}>
                        {submitButton === 'Create' ? 'Create Education' : 'Edit Education'}
                    </Typography>
                    <Grid container justifyContent="center">
                        <Grid item xs={12}>
                            <Box component="form" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
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
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Start Date"
                                                value={formData.startDate}
                                                onChange={(date) => handleDateChange('startDate', date)}
                                                renderInput={(params) => <TextField {...params} fullWidth required />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="End Date"
                                                value={formData.endDate}
                                                onChange={(date) => handleDateChange('endDate', date)}
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" fullWidth variant="contained" color="primary">
                                            {submitButton}
                                        </Button>
                                    </Grid>
                                    {isSuccess && (
                                        <Grid item xs={12}>
                                            <Alert severity="success">{successMessage}</Alert>
                                        </Grid>
                                    )}
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Base>
    );
};

export default EducationForm;