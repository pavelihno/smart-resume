import React, { useState, useEffect } from 'react';

import BaseForm from '../BaseForm';
import DatePickerField from '../../formFields/DatePickerField';
import BulletedListField from '../../formFields/BulletedListField';
import TextFieldInput from '../../formFields/TextFieldInput';
import { formatDateToLocalISO, parseDateValue } from '../../utils/date';

const ProjectForm = ({
	project,
	handleDelete,
	handleSubmit: submitProject,
	isSuccess,
	successMessage,
	submitButton,
	errors,
}) => {
	const [formData, setFormData] = useState({
		title: project?.title || '',
		url: project?.url || '',
		description: project?.description || '',
		responsibilities: project?.responsibilities || [],
		startDate: parseDateValue(project?.startDate),
		endDate: parseDateValue(project?.endDate),
	});

	useEffect(() => {
		if (project) {
			setFormData({
				title: project.title,
				url: project.url,
				description: project.description,
				responsibilities: project.responsibilities,
				startDate: parseDateValue(project.startDate),
				endDate: parseDateValue(project.endDate),
			});
		}
	}, [project]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleDateChange = (name, date) => {
		setFormData((prevData) => ({ ...prevData, [name]: date }));
	};

	const handleFormSubmit = () => {
		submitProject?.({
			...formData,
			startDate: formatDateToLocalISO(formData.startDate),
			endDate: formatDateToLocalISO(formData.endDate),
		});
	};

	return (
		<BaseForm
			title='Project'
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
					<TextFieldInput fullWidth label='URL' name='url' value={formData.url} onChange={handleChange} />
					<TextFieldInput
						fullWidth
						label='Description'
						name='description'
						value={formData.description}
						onChange={handleChange}
					/>
					<BulletedListField
						label='Responsibilities'
						formData={formData}
						setFormData={setFormData}
						itemsKey='responsibilities'
						newItemKey='newResponsibility'
						renderItem={(item) => item}
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

export default ProjectForm;
