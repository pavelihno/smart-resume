import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Grid, Button, Container, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../theme';
import DropMenu from './DropMenu';

const Base = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Button component={Link} to="/" startIcon={<img src="/images/logo.png" alt="Logo" width="50" height="50" />} variant="h6">
                                Smart Resume
                            </Button>
                        </Grid>
                        <Grid item>
                            <DropMenu
                                title="Education"
                                url="/educations"
                                nameKeys={['educationLevel', 'degree']}
                            />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ marginTop: '2rem', marginBottom: '1rem' }}>
                <CssBaseline />
                {children}
            </Container>
            <Container component="footer">
                <Typography variant="body2" align="center">
                    <Link to="https://github.com/pavelihno" target="_blank">
                        {`Copyright © Smart Resume ${new Date().getFullYear()}.`}
                    </Link>
                </Typography>
            </Container>
        </ThemeProvider>
    );
};

export default Base;