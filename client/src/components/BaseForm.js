import React from 'react';
import { Grid, Typography, Button, Box, Paper, Container, Alert } from '@mui/material';

import Base from './Base';

const BaseForm = ({ title, formFields, onSubmit, handleDelete, submitButton, isSuccess, successMessage, errors }) => {
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
                                    {formFields}
                                    <Grid item xs={12}>
                                        <Box display="flex" gap={2}>
                                            <Button type="submit" variant="contained" color="primary">
                                                {submitButton}
                                            </Button>
                                            {submitButton === 'Update' && (
                                                <Button variant="contained" color="secondary" onClick={handleDelete}>
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