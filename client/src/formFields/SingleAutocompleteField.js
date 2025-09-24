import React, { useMemo } from 'react';
import { Autocomplete, TextField, Grid } from '@mui/material';

const SingleAutocompleteField = ({
	options,
	value,
	onChange,
	getOptionLabel,
	label,
	required,
	isOptionEqualToValue,
	...props
}) => {
	const labelGetter = (option) => {
		if (typeof getOptionLabel === 'function') {
			const label = getOptionLabel(option);
			return typeof label === 'string' ? label : '';
		}
		return '';
	};

	const sortedOptions = useMemo(() => {
		if (!Array.isArray(options)) {
			return [];
		}
		return [...options].sort((a, b) =>
			labelGetter(a).localeCompare(labelGetter(b), undefined, { sensitivity: 'base' })
		);
	}, [options, getOptionLabel]);

	return (
		<>
			<Grid item xs={12}>
				<Autocomplete
					options={sortedOptions}
					getOptionLabel={getOptionLabel}
					value={value}
					onChange={(event, newValue) => onChange(newValue)}
					isOptionEqualToValue={isOptionEqualToValue}
					renderInput={(params) => (
						<TextField {...params} variant='outlined' label={label} required={required} />
					)}
					{...props}
				/>
			</Grid>
		</>
	);
};

export default SingleAutocompleteField;
