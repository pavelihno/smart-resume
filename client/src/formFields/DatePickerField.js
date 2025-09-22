import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { enGB } from 'date-fns/locale/en-GB';
import { Grid, TextField } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';

// Week starts on Monday
registerLocale('en-GB', enGB);

const DatePickerField = ({ label, value, onChange, required, dateFormat = 'dd.MM.yyyy', ...props }) => (
	<>
		<Grid item xs={12}>
			<DatePicker
				selected={value}
				onChange={onChange}
				dateFormat={dateFormat}
				placeholderText={label}
				customInput={<TextField fullWidth required={required} label={label} />}
				locale='en-GB'
				{...props}
			/>
		</Grid>
	</>
);

export default DatePickerField;
