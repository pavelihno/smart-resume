import React from 'react';
import { Autocomplete, TextField, Grid} from '@mui/material';

const SingleAutocompleteField = ({ options, value, onChange, getOptionLabel, label, required, isOptionEqualToValue, ...props }) => (
    <>
        <Grid item xs={12}>
            <Autocomplete
                options={options}
                getOptionLabel={getOptionLabel}
                value={value}
                onChange={(event, newValue) => onChange(newValue)}
                isOptionEqualToValue={isOptionEqualToValue}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label={label} required={required} />
                )}
                {...props}
            />
        </Grid>
    </>
);

export default SingleAutocompleteField;