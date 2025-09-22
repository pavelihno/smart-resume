import React from 'react';

import BaseCreateForm from '../BaseCreateForm';
import ProfileForm from './ProfileForm';

const CreateProfileForm = () => (
	<BaseCreateForm
		formComponent={ProfileForm}
		endpoint='/profiles'
		redirectRoute='/profiles'
		successMessage='Profile created successfully!'
		submitButton='Create'
	/>
);

export default CreateProfileForm;
