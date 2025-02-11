import React from 'react';

import BaseUpdateForm from '../BaseUpdateForm';
import LinkForm from './LinkForm';

const UpdateLinkForm = () => (
    <BaseUpdateForm
        formComponent={LinkForm}
        endpoint="/links"
        redirectRoute="/links"
        successMessage="Link updated successfully!"
        submitButton="Update"
        mapDataPropName="link"
    />
);

export default UpdateLinkForm;