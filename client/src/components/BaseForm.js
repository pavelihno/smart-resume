import React from 'react';
import { Grid, Typography, Button, Box, Paper, Container, Alert, TextField, Divider, Autocomplete } from '@mui/material';

import Base from './Base';

const BaseForm = ({ title, formFields, onSubmit, handleDelete, handleGeneratePdf, handleGenerateTex, submitButton, isSuccess, successMessage, errors, templates, selectedTemplate, handleTemplateChange }) => {

    const handleDeleteWithConfirmation = () => {
        if (window.confirm(`${title} will be deleted. Are you sure?`)) {
            handleDelete();
        }
    };
    
    return (
        <Base>
            <Container component="main" maxWidth="md">
                <Paper elevation={2} style={{ padding: '2rem' }}>
                    <Typography variant="h5" align="left" sx={{ textDecoration: 'underline', mb: '2rem' }}>
                        {title}
                    </Typography>
                    <Grid container justifyContent="center">
                        <Grid item xs={12}>
                            <Box component="form" onSubmit={onSubmit}>
                                <Grid container spacing={2}>
                                    {submitButton === 'Update' && handleGeneratePdf && handleGenerateTex && (
                                        <>
                                            <Grid item xs={12}>
                                                <Box display="flex" gap={2}>
                                                    <Autocomplete
                                                        disableClearable
                                                        options={templates}
                                                        value={selectedTemplate}
                                                        onChange={(event, newValue) => {if (newValue) { handleTemplateChange(newValue) } }}
                                                        renderInput={(params) => <TextField {...params} label="Template" />}
                                                        style={{ width: '30%' }}
                                                    />
                                                    <Button variant="contained" style={{ backgroundColor: '#4caf50', color: '#fff' }} onClick={handleGeneratePdf}>
                                                        Generate PDF
                                                    </Button>
                                                    <Button variant="contained" style={{ backgroundColor: '#ff9800', color: '#fff' }} onClick={handleGenerateTex}>
                                                        Generate TEX
                                                    </Button>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{ width: '100%', my: 2 }}>
                                                    <Divider />
                                                </Box>
                                            </Grid>
                                        </>
                                    )}
                                    {formFields}
                                    <Grid item xs={12}>
                                        <Box display="flex" gap={2}>
                                            <Button type="submit" variant="contained" color="primary">
                                                {submitButton}
                                            </Button>
                                            {submitButton === 'Update' && (
                                                <Button variant="contained" color="secondary" onClick={handleDeleteWithConfirmation}>
                                                    Delete
                                                </Button>
                                            )}
                                        </Box>
                                    </Grid>
                                    {isSuccess && (
                                        <Grid item xs={12}>
                                            <Alert severity="success">{successMessage}</Alert>
                                        </Grid>
                                    )}
                                    {Object.keys(errors).length > 0 && (
                                        <Grid item xs={12}>
                                            <Alert severity="error">
                                                {Object.values(errors).map((error, index) => (
                                                    <div key={index}>{error}</div>
                                                ))}
                                            </Alert>
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

export default BaseForm;