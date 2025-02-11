import React from 'react';

import BaseUpdateForm from '../BaseUpdateForm';
import ProfileForm from './ProfileForm';

const UpdateProfileForm = () => (
    <BaseUpdateForm
        formComponent={ProfileForm}
        endpoint="/profiles"
        redirectRoute="/profiles"
        successMessage="Profile updated successfully!"
        submitButton="Update"
        mapDataPropName="profile"
        withTemplate={true}
    />
);

export default UpdateProfileForm;