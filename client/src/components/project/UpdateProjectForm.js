import React from 'react';

import BaseUpdateForm from '../BaseUpdateForm';
import ProjectForm from './ProjectForm';

const UpdateProjectForm = () => (
	<BaseUpdateForm
		formComponent={ProjectForm}
		endpoint='/projects'
		redirectRoute='/projects'
		successMessage='Project updated successfully!'
		submitButton='Update'
		mapDataPropName='project'
	/>
);

export default UpdateProjectForm;
