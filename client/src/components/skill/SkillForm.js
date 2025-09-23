import React, { useState, useEffect } from 'react';

import BaseForm from '../BaseForm';
import TextFieldInput from '../../formFields/TextFieldInput';
import BulletedListField from '../../formFields/BulletedListField';

const SkillForm = ({
	skill,
	handleDelete,
	handleSubmit: submitSkill,
	isSuccess,
	successMessage,
	submitButton,
	errors,
}) => {
	const [formData, setFormData] = useState({
		title: skill?.title || '',
		details: skill?.details || [],
	});

	useEffect(() => {
		if (skill) {
			setFormData({
				title: skill.title,
				details: skill.details,
			});
		}
	}, [skill]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleFormSubmit = () => {
		submitSkill?.(formData);
	};

	return (
		<BaseForm
			title='Skill'
			formFields={
				<>
					<TextFieldInput
						required
						fullWidth
						label='Title'
						name='title'
						value={formData.title}
						onChange={handleChange}
					/>
					<BulletedListField
						formData={formData}
						setFormData={setFormData}
						label='Details'
						itemsKey='details'
						newItemKey='newDetail'
						renderItem={(detail) => detail}
					/>
				</>
			}
			handleDelete={handleDelete}
			handleSubmit={handleFormSubmit}
			submitButton={submitButton}
			isSuccess={isSuccess}
			successMessage={successMessage}
			errors={errors}
		/>
	);
};

export default SkillForm;
