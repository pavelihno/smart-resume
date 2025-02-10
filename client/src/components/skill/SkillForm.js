import React, { useState, useEffect } from 'react';
import { Grid, TextField, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import BaseForm from '../BaseForm';

const SkillForm = ({ skill, handleSubmit, handleDelete, isSuccess, successMessage, submitButton, errors }) => {
    const [formData, setFormData] = useState({
        title: skill?.title || '',
        details: skill?.details || []
    });

    useEffect(() => {
        if (skill) {
            setFormData({
                title: skill.title,
                details: skill.details
            });
        }
    }, [skill]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
    };

    return (
        <BaseForm
            title="Skill"
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
                            label="Details (Press Enter to add)"
                            name="newDetail"
                            value={formData.newDetail || ''}
                            onChange={(e) => setFormData((prevData) => ({ ...prevData, newDetail: e.target.value }))}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        details: [...prevData.details, prevData.newDetail],
                                        newDetail: ''
                                    }));
                                }
                            }}
                        />
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {formData.details.map((detail, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => {
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                details: prevData.details.filter((_, i) => i !== index)
                                            }));
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <Typography variant="body2">{detail}</Typography>
                                </li>
                            ))}
                        </ul>
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

export default SkillForm;