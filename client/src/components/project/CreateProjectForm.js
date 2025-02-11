import React from 'react';

import BaseCreateForm from '../BaseCreateForm';
import ProjectForm from './ProjectForm';

const CreateProjectForm = () => (
    <BaseCreateForm
        formComponent={ProjectForm}
        endpoint="/projects"
        redirectRoute="/projects"
        successMessage="Project created successfully!"
        submitButton="Create"
    />
);

export default CreateProjectForm;