import React, { useState, useEffect } from 'react';

import BaseForm from '../BaseForm';
import DatePickerField from '../../formFields/DatePickerField';
import BulletedListField from '../../formFields/BulletedListField';
import TextFieldInput from '../../formFields/TextFieldInput';

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
		startDate: project?.startDate || null,
		endDate: project?.endDate || null,
	});

	useEffect(() => {
		if (project) {
			setFormData({
				title: project.title,
				url: project.url,
				description: project.description,
				responsibilities: project.responsibilities,
				startDate: project.startDate ? new Date(project.startDate) : null,
				endDate: project.endDate ? new Date(project.endDate) : null,
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
			startDate: formData.startDate,
			endDate: formData.endDate,
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
