import React from 'react';

import BaseUpdateForm from '../BaseUpdateForm';
import CoverLetterForm from './CoverLetterForm';

const sanitizeSegment = (value) => {
	return (value || '')
		.replace(/[\\/:*?"<>|]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
};

const resolveDownloadName = (entity) => {
	if (!entity) {
		return 'cover-letter';
	}
	const profileName = sanitizeSegment(entity.profile?.name || entity.profile?.title || 'cover letter');
	const role = sanitizeSegment(entity.position || 'application');
	const base = [profileName, role].filter(Boolean).join(' - ');
	return base || 'cover-letter';
};

const UpdateCoverLetterForm = () => (
	<BaseUpdateForm
		formComponent={CoverLetterForm}
		endpoint='/cover-letters'
		redirectRoute='/cover-letters'
		successMessage='Cover letter updated successfully!'
		submitButton='Update'
		mapDataPropName='coverLetter'
		withTemplate={true}
		templatesEndpoint='/cover-letters/templates'
		resolveDownloadName={resolveDownloadName}
	/>
);

export default UpdateCoverLetterForm;
