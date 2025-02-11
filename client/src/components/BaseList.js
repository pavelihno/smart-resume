import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Paper, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Base from './Base';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const BaseList = ({ title, columns, rows, handleEdit, handleDelete, handleCopy, createLink }) => {
    return (
        <Base>
            <Container component="main" maxWidth="lg">
                <Paper elevation={2} style={{ padding: '2rem' }}>
                    <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '2rem' }}>
                        <Typography variant="h5" align="left" sx={{ textDecoration: 'underline', mb: '2rem' }}>
                            {title}
                        </Typography>
                        <IconButton component={Link} to={createLink} title="Add new" color="primary">
                            <AddIcon />
                        </IconButton>
                    </Container>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {Object.values(columns).map((column) => (
                                        <TableCell key={column} sx={{ fontWeight: 'bold' }}>{column}</TableCell>
                                    ))}
                                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row._id}>
                                        {Object.keys(columns).map((key) => (
                                            <TableCell key={key}>{row[key]}</TableCell>
                                        ))}
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(row._id)} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(row._id)} color="secondary">
                                                <DeleteIcon />
                                            </IconButton>
                                            {handleCopy && (
                                                <IconButton onClick={() => handleCopy(row._id)} color="default">
                                                    <ContentCopyIcon />
                                                </IconButton>
                                            )}
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