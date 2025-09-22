import React, { useEffect } from 'react';
import {
	Grid,
	Typography,
	Button,
	Box,
	Paper,
	Container,
	Alert,
	TextField,
	Divider,
	Autocomplete,
	Stack,
} from '@mui/material';

import Base from './Base';

const BaseForm = ({
	title,
	formFields,
	onSubmit,
	handleDelete,
	handleGeneratePdf,
	handleGenerateTex,
	submitButton,
	isSuccess,
	successMessage,
	errors,
	templates,
	selectedTemplate,
	handleTemplateChange,
}) => {
	const handleDeleteWithConfirmation = () => {
		if (window.confirm(`${title} will be deleted. Are you sure?`)) {
			handleDelete();
		}
	};

	useEffect(() => {
		let timer;
		if (isSuccess) {
			timer = setTimeout(() => {
				// Success message timeout placeholder for parent-controlled state
			}, 3200);
		}
		return () => clearTimeout(timer);
	}, [isSuccess]);

	const exportButtonBaseSx = {
		px: { xs: 3.5, sm: 4.5 },
		py: { xs: 1.2, sm: 1.45 },
		borderRadius: 2,
		fontWeight: 600,
		fontSize: '0.95rem',
		whiteSpace: 'nowrap',
		letterSpacing: 0.2,
	};

	return (
		<Base>
			<Container component='main' maxWidth='md' sx={{ px: { xs: 0, md: 2 } }}>
				<Paper
					elevation={0}
					sx={{
						p: { xs: 3, md: 5 },
						borderRadius: 4,
						backgroundColor: 'background.paper',
						border: '1px solid rgba(51, 87, 255, 0.08)',
						boxShadow: '0 32px 72px rgba(15, 23, 42, 0.12)',
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					<Box
						sx={{
							position: 'absolute',
							top: 0,
							right: 0,
							width: 160,
							height: 160,
							background: 'radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.2), transparent 60%)',
						}}
					/>
					<Box sx={{ mb: 4, position: 'relative' }}>
						<Typography variant='h4' component='h1' sx={{ fontWeight: 700, mb: 1 }}>
							{title}
						</Typography>
						<Typography variant='body1' color='text.secondary'>
							Refine the details below and keep your resume content polished.
						</Typography>
					</Box>

					<Grid container spacing={3}>
						{submitButton === 'Update' && handleGeneratePdf && handleGenerateTex && (
							<Grid item xs={12}>
								<Stack
									direction={{ xs: 'column', md: 'row' }}
									spacing={2.5}
									sx={{
										backgroundColor: 'rgba(51, 87, 255, 0.06)',
										borderRadius: 3,
										p: { xs: 2, md: 3 },
										alignItems: { xs: 'stretch', md: 'center' },
									}}
								>
									<Autocomplete
										disableClearable
										options={templates}
										value={selectedTemplate}
										onChange={(event, newValue) => {
											if (newValue) {
												handleTemplateChange(newValue);
											}
										}}
										renderInput={(params) => <TextField {...params} label='Template' />}
										fullWidth
									/>
									<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
										<Button
											variant='contained'
											sx={{
												...exportButtonBaseSx,
												background: 'linear-gradient(135deg, #3357FF 0%, #4f74ff 100%)',
												color: '#ffffff',
												boxShadow: '0 14px 32px rgba(51, 87, 255, 0.28)',
												'&:hover': {
													background: 'linear-gradient(135deg, #2646db 0%, #4f74ff 100%)',
													boxShadow: '0 16px 36px rgba(38, 70, 219, 0.32)',
												},
											}}
											onClick={handleGeneratePdf}
										>
											Generate PDF
										</Button>
										<Button
											variant='contained'
											sx={{
												...exportButtonBaseSx,
												background: 'linear-gradient(135deg, #1EC996 0%, #0fa36b 100%)',
												color: '#ffffff',
												boxShadow: '0 14px 28px rgba(15, 163, 107, 0.28)',
												'&:hover': {
													background: 'linear-gradient(135deg, #18b482 0%, #079964 100%)',
													boxShadow: '0 16px 32px rgba(7, 153, 100, 0.34)',
												},
											}}
											onClick={handleGenerateTex}
										>
											Generate TEX
										</Button>
									</Stack>
								</Stack>
							</Grid>
						)}

						<Grid item xs={12}>
							<Divider sx={{ my: { xs: 1, md: 2 } }} />
						</Grid>

						{formFields}

						<Grid item xs={12}>
							<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
								<Button type='submit' variant='contained' color='primary' size='large'>
									{submitButton}
								</Button>
								{submitButton === 'Update' && (
									<Button variant='outlined' color='secondary' onClick={handleDeleteWithConfirmation}>
										Delete
									</Button>
								)}
							</Stack>
						</Grid>

						{isSuccess && (
							<Grid item xs={12}>
								<Alert severity='success' variant='outlined'>
									{successMessage}
								</Alert>
							</Grid>
						)}

						{Object.keys(errors).length > 0 && (
							<Grid item xs={12}>
								<Alert severity='error' variant='outlined'>
									{Object.values(errors).map((error, index) => (
										<div key={index}>{error}</div>
									))}
								</Alert>
							</Grid>
						)}
					</Grid>
				</Paper>
			</Container>
		</Base>
	);
};

export default BaseForm;
