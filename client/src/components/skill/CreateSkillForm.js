import React from 'react';

import BaseCreateForm from '../BaseCreateForm';
import SkillForm from './SkillForm';

const CreateSkillForm = () => (
	<BaseCreateForm
		formComponent={SkillForm}
		endpoint='/skills'
		redirectRoute='/skills'
		successMessage='Skill created successfully!'
		submitButton='Create'
	/>
);

export default CreateSkillForm;
