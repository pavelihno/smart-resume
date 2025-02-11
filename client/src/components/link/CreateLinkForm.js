import React from 'react';

import BaseCreateForm from '../BaseCreateForm';
import LinkForm from './LinkForm';

const CreateLinkForm = () => (
    <BaseCreateForm
        formComponent={LinkForm}
        endpoint="/links"
        redirectRoute="/links"
        successMessage="Link created successfully!"
        submitButton="Create"
    />
);

export default CreateLinkForm;