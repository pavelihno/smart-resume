import React from 'react';

import BaseUpdateForm from '../BaseUpdateForm';
import SkillForm from './SkillForm';

const UpdateSkillForm = () => (
	<BaseUpdateForm
		formComponent={SkillForm}
		endpoint='/skills'
		redirectRoute='/skills'
		successMessage='Skill updated successfully!'
		submitButton='Update'
		mapDataPropName='skill'
	/>
);

export default UpdateSkillForm;
