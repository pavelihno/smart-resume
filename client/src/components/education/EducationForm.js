import React, { useState, useEffect } from 'react';

import BaseForm from '../BaseForm';
import TextFieldInput from '../../formFields/TextFieldInput';
import DatePickerField from '../../formFields/DatePickerField';

const EducationForm = ({
	education,
	handleDelete,
	handleSubmit: submitEducation,
	isSuccess,
	successMessage,
	submitButton,
	errors,
}) => {
	const [formData, setFormData] = useState({
		institution: education?.institution || '',
		educationLevel: education?.educationLevel || '',
		degree: education?.degree || '',
		department: education?.department || '',
		specialization: education?.specialization || '',
		location: education?.location || '',
		startDate: education?.startDate || null,
		endDate: education?.endDate || null,
	});

	useEffect(() => {
		if (education) {
			setFormData({
				institution: education.institution,
				educationLevel: education.educationLevel,
				degree: education.degree,
				department: education.department,
				specialization: education.specialization,
				location: education.location,
				startDate: education.startDate,
				endDate: education.endDate,
			});
		}
	}, [education]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleDateChange = (name, date) => {
		setFormData((prevData) => ({ ...prevData, [name]: date }));
	};

	const handleFormSubmit = () => {
		submitEducation?.(formData);
	};

	return (
		<BaseForm
			title={'Education'}
			formFields={
				<>
					<TextFieldInput
						label='Institution'
						name='institution'
						value={formData.institution}
						onChange={handleChange}
						required
					/>
					<TextFieldInput
						label='Education Level'
						name='educationLevel'
						value={formData.educationLevel}
						onChange={handleChange}
						required
					/>
					<TextFieldInput
						label='Degree'
						name='degree'
						value={formData.degree}
						onChange={handleChange}
						required
					/>
					<TextFieldInput
						label='Department'
						name='department'
						value={formData.department}
						onChange={handleChange}
						required
					/>
					<TextFieldInput
						label='Specialization'
						name='specialization'
						value={formData.specialization}
						onChange={handleChange}
						required
					/>
					<TextFieldInput
						label='Location'
						name='location'
						value={formData.location}
						onChange={handleChange}
						required
					/>
					<DatePickerField
						label='Start Date'
						value={formData.startDate}
						onChange={(date) => handleDateChange('startDate', date)}
						required
					/>
					<DatePickerField
						label='End Date'
						value={formData.endDate}
						onChange={(date) => handleDateChange('endDate', date)}
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

export default EducationForm;
