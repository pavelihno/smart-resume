import React from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';

const MultiAutocompleteField = ({
	options,
	value,
	onChange,
	getOptionLabel,
	label,
	required,
	isOptionEqualToValue,
	...props
}) => (
	<>
		<Grid item xs={12}>
			<Autocomplete
				multiple
				options={options}
				getOptionLabel={getOptionLabel}
				value={value}
				onChange={(event, newValue) => onChange(newValue)}
				isOptionEqualToValue={isOptionEqualToValue}
				renderInput={(params) => <TextField {...params} variant='outlined' label={label} required={required} />}
				{...props}
			/>
		</Grid>
	</>
);

export default MultiAutocompleteField;
