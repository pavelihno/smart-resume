import React, { useEffect, useMemo, useState } from 'react';
import { Grid, TextField } from '@mui/material';

import BaseForm from '../BaseForm';
import TextFieldInput from '../../formFields/TextFieldInput';
import SingleAutocompleteField from '../../formFields/SingleAutocompleteField';
import DatePickerField from '../../formFields/DatePickerField';
import HtmlEditorField from '../../formFields/HtmlEditorField';
import { api } from '../../api';

const BODY_FORMAT_OPTIONS = [
	{ value: 'plain', label: 'Plain text' },
	{ value: 'html', label: 'HTML (basic tags)' },
	{ value: 'latex', label: 'LaTeX (advanced users)' },
];

const CoverLetterForm = ({
	coverLetter,
	handleSubmit: submitCoverLetter,
	handleDelete,
	handleGeneratePdf,
	handleGenerateTex,
	handleOpenOverleaf,
	isSuccess,
	successMessage,
	submitButton,
	errors,
	templates = [],
	selectedTemplate = null,
	handleTemplateChange = () => {},
}) => {
	const [profileOptions, setProfileOptions] = useState([]);
	const [formData, setFormData] = useState({
		profile: coverLetter?.profile?._id || '',
		position: coverLetter?.position || '',
		company: coverLetter?.company || '',
		companyRecipient: coverLetter?.companyRecipient || '',
		companyLocation: coverLetter?.companyLocation || '',
		senderLocation: coverLetter?.senderLocation || '',
		salutation: coverLetter?.salutation || 'Dear Hiring Manager,',
		closing: coverLetter?.closing || 'Sincerely,',
		body: coverLetter?.body || '',
		bodyFormat: coverLetter?.bodyFormat || 'plain',
		sentAt: coverLetter?.sentAt ? new Date(coverLetter.sentAt) : null,
	});

	useEffect(() => {
		const fetchProfiles = async () => {
			try {
				const response = await api.get('/profiles');
				setProfileOptions(response.data);
			} catch (error) {
				console.error('Failed to fetch profiles', error);
			}
		};

		fetchProfiles();
	}, []);

	useEffect(() => {
		if (coverLetter) {
			setFormData({
				profile: coverLetter.profile?._id || coverLetter.profile || '',
				position: coverLetter.position || '',
				company: coverLetter.company || '',
				companyRecipient: coverLetter.companyRecipient || '',
				companyLocation: coverLetter.companyLocation || '',
				senderLocation: coverLetter.senderLocation || '',
				salutation: coverLetter.salutation || 'Dear Hiring Manager,',
				closing: coverLetter.closing || 'Sincerely,',
				body: coverLetter.body || '',
				bodyFormat: coverLetter.bodyFormat || 'plain',
				sentAt: coverLetter.sentAt ? new Date(coverLetter.sentAt) : null,
			});
		}
	}, [coverLetter]);

	const selectedProfile = useMemo(
		() => profileOptions.find((option) => option?._id === formData.profile) || null,
		[profileOptions, formData.profile]
	);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleBodyFormatChange = (event) => {
		setFormData((prev) => ({ ...prev, bodyFormat: event.target.value }));
	};

	const handleDateChange = (date) => {
		setFormData((prev) => ({ ...prev, sentAt: date }));
	};

	const handleProfileChange = (profile) => {
		setFormData((prev) => ({ ...prev, profile: profile?._id || '' }));
	};

	const handleFormSubmit = () => {
		if (!submitCoverLetter) {
			return;
		}

		submitCoverLetter({
			profile: formData.profile,
			position: formData.position.trim(),
			company: formData.company.trim(),
			companyRecipient: formData.companyRecipient.trim(),
			companyLocation: formData.companyLocation.trim(),
			senderLocation: formData.senderLocation.trim(),
			salutation: formData.salutation.trim(),
			closing: formData.closing.trim(),
			body: formData.body,
			bodyFormat: formData.bodyFormat,
			sentAt: formData.sentAt,
		});
	};

	const renderBodyField = () => {
		switch (formData.bodyFormat) {
			case 'html':
				return (
					<HtmlEditorField
						label='Body'
						value={formData.body}
						onChange={(html) => setFormData((prev) => ({ ...prev, body: html }))}
						helperText='Use the toolbar or keyboard shortcuts (Ctrl/Cmd + B, I, U) to format content. Links must include https://.'
					/>
				);
			case 'latex':
				return (
					<TextFieldInput
						required
						label='Body'
						name='body'
						value={formData.body}
						onChange={handleChange}
						multiline
						minRows={8}
						helperText='Provide LaTeX markup. It will be injected directly into the template.'
					/>
				);
			case 'plain':
			default:
				return (
					<TextFieldInput
						required
						label='Body'
						name='body'
						value={formData.body}
						onChange={handleChange}
						multiline
						minRows={8}
						helperText='Plain text supports optional lightweight tokens ([[B]]bold[[/B]], [[I]]italics[[/I]], [[LI]] list).'
					/>
				);
		}
	};

	return (
		<BaseForm
			title='Cover Letter'
			formFields={
				<>
					<SingleAutocompleteField
						required
						label='Profile'
						options={profileOptions}
						value={selectedProfile}
						onChange={handleProfileChange}
						getOptionLabel={(option) => option?.name || ''}
						isOptionEqualToValue={(option, value) => option?._id === value?._id}
						fullWidth
					/>
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
					<TextFieldInput
						label='Recipient'
						name='companyRecipient'
						value={formData.companyRecipient}
						onChange={handleChange}
					/>
					<TextFieldInput
						label='Company Location'
						name='companyLocation'
						value={formData.companyLocation}
						onChange={handleChange}
					/>
					<TextFieldInput
						required
						label='Sender Location'
						name='senderLocation'
						value={formData.senderLocation}
						onChange={handleChange}
					/>
					<TextFieldInput
						label='Salutation'
						name='salutation'
						value={formData.salutation}
						onChange={handleChange}
					/>
					<TextFieldInput label='Closing' name='closing' value={formData.closing} onChange={handleChange} />
					{renderBodyField()}
					<Grid item xs={12}>
						<TextField
							select
							fullWidth
							label='Body Format'
							value={formData.bodyFormat}
							onChange={handleBodyFormatChange}
							helperText='Choose how the body text should be interpreted when generating LaTeX.'
							SelectProps={{ native: true }}
						>
							{BODY_FORMAT_OPTIONS.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</TextField>
					</Grid>
					<DatePickerField label='Date' value={formData.sentAt} onChange={handleDateChange} />
				</>
			}
			handleSubmit={handleFormSubmit}
			handleDelete={handleDelete}
			handleGeneratePdf={handleGeneratePdf}
			handleGenerateTex={handleGenerateTex}
			handleOpenOverleaf={handleOpenOverleaf}
			submitButton={submitButton}
			isSuccess={isSuccess}
			successMessage={successMessage}
			errors={errors}
			templates={templates}
			selectedTemplate={selectedTemplate}
			handleTemplateChange={handleTemplateChange}
		/>
	);
};

export default CoverLetterForm;
