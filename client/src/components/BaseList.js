import React, { useMemo, useState } from 'react';
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
	TextField,
	TableSortLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';

import Base from './Base';

const PICK_KEYS = ['title', 'name', 'label', 'type', 'value'];

const pickDisplayString = (value) => {
	if (value === null || value === undefined) {
		return '';
	}

	if (Array.isArray(value)) {
		const flattened = value.map((item) => pickDisplayString(item)).filter((item) => item !== '');
		return flattened.join(', ');
	}

	if (typeof value === 'object') {
		for (const key of PICK_KEYS) {
			if (Object.prototype.hasOwnProperty.call(value, key)) {
				const selected = pickDisplayString(value[key]);
				if (selected !== '') {
					return selected;
				}
			}
		}

		const objectValues = Object.values(value)
			.map((item) => pickDisplayString(item))
			.filter((item) => item !== '');

		return objectValues.join(', ');
	}

	return String(value);
};

const formatCellValue = (value) => {
	const display = pickDisplayString(value);
	return display === '' ? '—' : display;
};

const BaseList = ({ title, columns, rows, handleEdit, handleDelete, handleCopy, createLink, sortKey }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [sortColumn, setSortColumn] = useState(sortKey || '');
	const [sortDirection, setSortDirection] = useState('asc');

	const handleDeleteWithConfirmation = (id) => {
		if (window.confirm('Item will be deleted. Are you sure?')) {
			handleDelete(id);
		}
	};

	const handleSortChange = (column) => {
		if (sortColumn === column) {
			// Toggle direction if clicking the same column
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			// Set new column and default to ascending
			setSortColumn(column);
			setSortDirection('asc');
		}
	};

	const safeRows = Array.isArray(rows) ? rows : [];

	const filteredAndSortedRows = useMemo(() => {
		const normalizeValue = (value) => {
			const display = pickDisplayString(value);
			return display.trim().toLowerCase();
		};

		// First, filter rows based on search query
		let processedRows = safeRows;
		if (searchQuery.trim() !== '') {
			const query = searchQuery.toLowerCase();
			processedRows = safeRows.filter((row) => {
				// Search in all visible columns
				return Object.keys(columns).some((key) => {
					const cellValue = normalizeValue(row[key]);
					return cellValue.includes(query);
				});
			});
		}

		// Then, sort the filtered rows
		if (!sortColumn) {
			return processedRows;
		}

		return [...processedRows].sort((a, b) => {
			const valueA = normalizeValue(a?.[sortColumn]);
			const valueB = normalizeValue(b?.[sortColumn]);

			if (valueA === valueB) {
				return 0;
			}

			if (valueA === '') {
				return sortDirection === 'asc' ? 1 : -1;
			}

			if (valueB === '') {
				return sortDirection === 'asc' ? -1 : 1;
			}

			const comparison = valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' });
			return sortDirection === 'asc' ? comparison : -comparison;
		});
	}, [safeRows, sortColumn, sortDirection, searchQuery, columns]);

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

					<Box sx={{ mb: 3 }}>
						<TextField
							fullWidth
							variant='outlined'
							placeholder='Search...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							InputProps={{
								startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
							}}
							size='small'
						/>
					</Box>

					<TableContainer sx={{ borderRadius: 1, overflow: 'hidden' }}>
						<Table>
							<TableHead>
								<TableRow>
									{Object.entries(columns).map(([key, label]) => (
										<TableCell key={key} sx={{ fontSize: '0.9rem', textTransform: 'uppercase' }}>
											<TableSortLabel
												active={sortColumn === key}
												direction={sortColumn === key ? sortDirection : 'asc'}
												onClick={() => handleSortChange(key)}
											>
												{label}
											</TableSortLabel>
										</TableCell>
									))}
									<TableCell sx={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>
										Actions
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredAndSortedRows.map((row) => (
									<TableRow key={row._id} hover>
										{Object.keys(columns).map((key) => (
											<TableCell key={key} sx={{ verticalAlign: 'top' }}>
												{formatCellValue(row[key])}
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
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</Base>
	);
};

export default BaseList;
