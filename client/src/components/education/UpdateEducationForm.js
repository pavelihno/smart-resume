import React from 'react';

import BaseUpdateForm from '../BaseUpdateForm';
import EducationForm from './EducationForm';

const UpdateEducationForm = () => (
    <BaseUpdateForm
        formComponent={EducationForm}
        endpoint="/educations"
        redirectRoute="/educations"
        successMessage="Education updated successfully!"
        submitButton="Update"
        mapDataPropName="education"
    />
);

export default UpdateEducationForm;