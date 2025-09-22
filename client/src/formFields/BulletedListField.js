import React from 'react';
import { TextField, IconButton, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const BulletedListField = ({ formData, setFormData, renderItem, label, itemsKey, newItemKey }) => {
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Grid item xs={12}>
				<TextField
					fullWidth
					label={`${label} (press Enter to add)`}
					name={newItemKey}
					value={formData[newItemKey] || ''}
					onChange={handleChange}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && formData[newItemKey].trim() !== '') {
							e.preventDefault();
							setFormData((prevData) => ({
								...prevData,
								[itemsKey]: [...prevData[itemsKey], prevData[newItemKey].trim()],
								[newItemKey]: '',
							}));
						}
					}}
				/>
				<ul style={{ listStyleType: 'none', padding: 0 }}>
					{formData[itemsKey].map((item, index) => (
						<li key={index} style={{ display: 'flex', alignItems: 'center' }}>
							<IconButton
								size='small'
								onClick={() => {
									const newList = formData[itemsKey].filter((_, i) => i !== index);
									setFormData({ ...formData, [itemsKey]: newList });
								}}
							>
								<DeleteIcon fontSize='small' />
							</IconButton>
							<Typography variant='body1' style={{ marginLeft: 8 }}>
								{renderItem ? renderItem(item) : item}
							</Typography>
						</li>
					))}
				</ul>
			</Grid>
		</>
	);
};

export default BulletedListField;
