import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { api } from '../api';

const BaseUpdateForm = ({
	formComponent: FormComponent,
	endpoint,
	redirectRoute,
	successMessage,
	submitButton,
	mapDataPropName = 'data',
	withTemplate = false,
}) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [entity, setEntity] = useState(null);
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const fetchEntity = async () => {
			try {
				const response = await api.get(`${endpoint}/${id}`);
				setEntity(response.data);
			} catch (error) {
				setErrors(error.response?.data || { message: 'Error fetching data' });
			}
		};

		fetchEntity();
	}, [id, endpoint]);

	const handleSubmit = async (formData) => {
		setErrors({});
		try {
			await api.put(`${endpoint}/${id}`, formData);
			setUpdateSuccess(true);
		} catch (error) {
			setErrors(error.response?.data || { message: 'Error updating data' });
		}
	};

	const handleDelete = async () => {
		setErrors({});
		try {
			await api.delete(`${endpoint}/${id}`);
			navigate(redirectRoute);
		} catch (error) {
			setErrors(error.response?.data || { message: 'Error deleting data' });
		}
	};

	const [selectedTemplate, setSelectedTemplate] = useState('');
	const [templates, setTemplates] = useState([]);

	let handleTemplateChange, handleGeneratePdf, handleGenerateTex, handleOpenOverleaf;

	if (withTemplate) {
		const fetchTemplates = async () => {
			try {
				const response = await api.get(`profiles/templates`);
				setTemplates(response.data);
				if (response.data.length > 0) {
					setSelectedTemplate(response.data[0]);
				}
			} catch (error) {
				setErrors(error.response?.data || { message: 'Error fetching templates' });
			}
		};

		useEffect(() => {
			fetchTemplates();
		}, [endpoint]);

		handleTemplateChange = (templateName) => {
			setSelectedTemplate(templateName);
		};

		const handleGenerateFile = async (fileType) => {
			setErrors({});
			try {
				const response = await api.get(`${endpoint}/${id}/${fileType}`, {
					params: { template: selectedTemplate },
					responseType: 'blob',
				});

				const url = window.URL.createObjectURL(response.data);
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `${entity && entity.name ? entity.name : 'file'}.${fileType}`);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			} catch (error) {
				if (error.response && error.response.data instanceof Blob) {
					const errorText = await error.response.data.text();
					try {
						setErrors(JSON.parse(errorText));
					} catch (parseError) {
						setErrors({ message: errorText });
					}
				} else {
					setErrors(error.response ? error.response.data : { message: error.message });
				}
			}
		};

		handleGeneratePdf = () => handleGenerateFile('pdf');
		handleGenerateTex = () => handleGenerateFile('tex');

		handleOpenOverleaf = async () => {
			setErrors({});
			try {
				const response = await api.get(`${endpoint}/${id}/tex`, {
					params: { template: selectedTemplate },
					responseType: 'blob',
				});

				const blob = new Blob([response.data], { type: 'application/x-tex' });

				const dataUrl = await new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.onloadend = () => {
						if (typeof reader.result === 'string') {
							resolve(reader.result);
						} else {
							reject(new Error('Unexpected reader result type'));
						}
					};
					reader.onerror = () => reject(reader.error);
					reader.readAsDataURL(blob);
				});

				const form = document.createElement('form');
				form.action = 'https://www.overleaf.com/docs';
				form.method = 'POST';
				form.target = '_blank';

				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'snip_uri';
				input.value = dataUrl;

				form.appendChild(input);
				document.body.appendChild(form);
				form.submit();
				document.body.removeChild(form);
			} catch (error) {
				if (error.response && error.response.data instanceof Blob) {
					const errorText = await error.response.data.text();
					try {
						setErrors(JSON.parse(errorText));
					} catch (parseError) {
						setErrors({ message: errorText });
					}
				} else {
					setErrors(error.response ? error.response.data : { message: error.message });
				}
			}
		};
	}

	return (
		<FormComponent
			{...{ [mapDataPropName]: entity }}
			handleSubmit={handleSubmit}
			handleDelete={handleDelete}
			isSuccess={updateSuccess}
			successMessage={successMessage}
			submitButton={submitButton}
			errors={errors}
			templates={templates}
			selectedTemplate={selectedTemplate}
			handleTemplateChange={handleTemplateChange}
			handleGeneratePdf={handleGeneratePdf}
			handleGenerateTex={handleGenerateTex}
			handleOpenOverleaf={handleOpenOverleaf}
		/>
	);
};

export default BaseUpdateForm;
