import React from 'react';

import BaseUpdateForm from '../BaseUpdateForm';
import WorkExperienceForm from './WorkExperienceForm';

const UpdateWorkExperienceForm = () => (
    <BaseUpdateForm
        formComponent={WorkExperienceForm}
        endpoint="/work-experiences"
        redirectRoute="/work-experiences"
        successMessage="Work experience updated successfully!"
        submitButton="Update"
        mapDataPropName="workExperience"
    />
);

export default UpdateWorkExperienceForm;