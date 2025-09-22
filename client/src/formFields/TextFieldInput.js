import React from 'react';
import { TextField, Grid } from '@mui/material';

const TextFieldInput = ({
	label,
	name,
	value,
	onChange,
	required,
	multiline = false,
	variant = 'outlined',
	...props
}) => (
	<>
		<Grid item xs={12}>
			<TextField
				fullWidth
				label={label}
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				multiline={multiline}
				variant={variant}
				{...props}
			/>
		</Grid>
	</>
);

export default TextFieldInput;
