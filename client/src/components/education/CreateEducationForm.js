import React from 'react';

import BaseCreateForm from '../BaseCreateForm';
import EducationForm from './EducationForm';

const CreateEducationForm = () => (
	<BaseCreateForm
		formComponent={EducationForm}
		endpoint='/educations'
		redirectRoute='/educations'
		successMessage='Education created successfully!'
		submitButton='Create'
	/>
);

export default CreateEducationForm;
