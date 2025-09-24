import React, { useState, useEffect } from 'react';

import BaseForm from '../BaseForm';
import TextFieldInput from '../../formFields/TextFieldInput';
import BulletedListField from '../../formFields/BulletedListField';
import DatePickerField from '../../formFields/DatePickerField';
import { formatDateToLocalISO, parseDateValue } from '../../utils/date';

const WorkExperienceForm = ({
	workExperience,
	handleDelete,
	handleSubmit: submitWorkExperience,
	isSuccess,
	successMessage,
	submitButton,
	errors,
}) => {
	const [formData, setFormData] = useState({
		position: workExperience?.position || '',
		company: workExperience?.company || '',
		domain: workExperience?.domain || '',
		responsibilities: workExperience?.responsibilities || [],
		location: workExperience?.location || '',
		startDate: parseDateValue(workExperience?.startDate),
		endDate: parseDateValue(workExperience?.endDate),
	});

	useEffect(() => {
		if (workExperience) {
			setFormData({
				position: workExperience.position,
				company: workExperience.company,
				domain: workExperience.domain,
				responsibilities: workExperience.responsibilities,
				location: workExperience.location,
				startDate: parseDateValue(workExperience.startDate),
				endDate: parseDateValue(workExperience.endDate),
			});
		}
	}, [workExperience]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleDateChange = (name, date) => {
		setFormData((prevData) => ({ ...prevData, [name]: date }));
	};

	const handleFormSubmit = () => {
		submitWorkExperience?.({
			...formData,
			startDate: formatDateToLocalISO(formData.startDate),
			endDate: formatDateToLocalISO(formData.endDate),
		});
	};

	return (
		<BaseForm
			title='Work Experience'
			formFields={
				<>
					<TextFieldInput
						required
						label='Position'
						name='position'
						value={formData.position}
						onChange={handleChange}
					/>
					<TextFieldInput
						required
						label='Company'
						name='company'
						value={formData.company}
						onChange={handleChange}
					/>
					<TextFieldInput label='Domain' name='domain' value={formData.domain} onChange={handleChange} />
					<BulletedListField
						formData={formData}
						setFormData={setFormData}
						label='Responsibilities'
						itemsKey='responsibilities'
						newItemKey='newResponsibility'
					/>
					<TextFieldInput
						required
						label='Location'
						name='location'
						value={formData.location}
						onChange={handleChange}
					/>
					<DatePickerField
						required
						label='Start Date'
						value={formData.startDate}
						onChange={(date) => handleDateChange('startDate', date)}
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

export default WorkExperienceForm;
