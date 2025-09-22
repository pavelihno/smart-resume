import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Container,
	Paper,
	IconButton,
	Typography,
	Button,
	Stack,
	Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import Base from './Base';

const BaseList = ({ title, columns, rows, handleEdit, handleDelete, handleCopy, createLink }) => {
	const handleDeleteWithConfirmation = (id) => {
		if (window.confirm('Item will be deleted. Are you sure?')) {
			handleDelete(id);
		}
	};

	return (
		<Base>
			<Container component='section' maxWidth='lg'>
				<Paper
					elevation={0}
					sx={{
						p: { xs: 2, md: 4 },
						borderRadius: 2,
						border: '1px solid rgba(51, 87, 255, 0.08)',
						backgroundColor: 'background.paper',
						boxShadow: '0 16px 44px rgba(15, 23, 42, 0.08)',
					}}
				>
					<Stack
						direction={{ xs: 'column', md: 'row' }}
						justifyContent='space-between'
						alignItems={{ xs: 'flex-start', md: 'center' }}
						spacing={2}
						sx={{ mb: { xs: 3, md: 4 } }}
					>
						<Box>
							<Typography variant='h4' component='h1' sx={{ fontWeight: 700 }}>
								{title}
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								Manage and iterate quickly on your content inventory.
							</Typography>
						</Box>
						<Button
							component={Link}
							to={createLink}
							variant='contained'
							color='primary'
							startIcon={<AddIcon />}
						>
							Add New
						</Button>
					</Stack>

					<TableContainer sx={{ borderRadius: 1, overflow: 'hidden' }}>
						<Table>
							<TableHead>
								<TableRow>
									{Object.values(columns).map((column) => (
										<TableCell key={column} sx={{ fontSize: '0.9rem', textTransform: 'uppercase' }}>
											{column}
										</TableCell>
									))}
									<TableCell sx={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>
										Actions
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={Object.keys(columns).length + 1}
											align='center'
											sx={{ py: 6 }}
										>
											<Typography variant='body1' color='text.secondary'>
												No data yet. Start by adding a new entry.
											</Typography>
										</TableCell>
									</TableRow>
								) : (
									rows.map((row) => (
										<TableRow key={row._id} hover>
											{Object.keys(columns).map((key) => (
												<TableCell key={key} sx={{ verticalAlign: 'top' }}>
													{row[key]}
												</TableCell>
											))}
											<TableCell>
												<Stack direction='row' spacing={1}>
													<IconButton
														onClick={() => handleEdit(row._id)}
														color='primary'
														size='small'
														aria-label='Edit'
													>
														<EditIcon fontSize='small' />
													</IconButton>
													<IconButton
														onClick={() => handleDeleteWithConfirmation(row._id)}
														color='secondary'
														size='small'
														aria-label='Delete'
													>
														<DeleteIcon fontSize='small' />
													</IconButton>
													{handleCopy && (
														<IconButton
															color='default'
															size='small'
															onClick={() => handleCopy(row._id)}
															aria-label='Copy'
														>
															<ContentCopyIcon fontSize='small' />
														</IconButton>
													)}
												</Stack>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</Base>
	);
};

export default BaseList;
