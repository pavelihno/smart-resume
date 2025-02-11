import React from 'react';
import { Grid, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerField = ({ label, value, onChange, required, dateFormat = "dd.MM.yyyy", ...props }) => (
    <>
        <Grid item xs={12}>
            <DatePicker
                selected={value}
                onChange={onChange}
                dateFormat={dateFormat}
                placeholderText={label}
                customInput={<TextField fullWidth required={required} label={label} />}
                locale="en-GB"
                {...props}
            />
        </Grid>
    </>
);

export default DatePickerField;