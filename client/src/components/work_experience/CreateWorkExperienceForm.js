import React from 'react';

import BaseCreateForm from '../BaseCreateForm';
import WorkExperienceForm from './WorkExperienceForm';

const CreateWorkExperienceForm = () => (
	<BaseCreateForm
		formComponent={WorkExperienceForm}
		endpoint='/work-experiences'
		redirectRoute='/work-experiences'
		successMessage='Work experience created successfully!'
		submitButton='Create'
	/>
);

export default CreateWorkExperienceForm;
