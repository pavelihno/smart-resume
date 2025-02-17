import React, { useState, useEffect } from 'react';

import BaseForm from '../BaseForm';
import TextFieldInput from '../../formFields/TextFieldInput';

const LinkForm = ({ link, handleSubmit, handleDelete, isSuccess, successMessage, submitButton, errors }) => {
    const [formData, setFormData] = useState({
        type: link?.type || '',
        url: link?.url || ''
    });

    useEffect(() => {
        if (link) {
            setFormData({
                type: link.type,
                url: link.url
            });
        }
    }, [link]);

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
            title="Link"
            formFields={
                <>
                    <TextFieldInput
                        label="Type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    />
                    <TextFieldInput
                        label="URL"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        required
                    />
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

export default LinkForm;