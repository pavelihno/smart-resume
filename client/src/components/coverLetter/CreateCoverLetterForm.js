import React from 'react';

import BaseCreateForm from '../BaseCreateForm';
import CoverLetterForm from './CoverLetterForm';

const CreateCoverLetterForm = () => (
	<BaseCreateForm
		formComponent={CoverLetterForm}
		endpoint='/cover-letters'
		redirectRoute='/cover-letters'
		successMessage='Cover letter created successfully!'
		submitButton='Create'
	/>
);

export default CreateCoverLetterForm;
