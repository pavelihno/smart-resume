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
                    <Grid container alignItems="center">
                        <Grid item>
                            <Button component={Link} to="/" startIcon={<img src="/images/logo.png" alt="Logo" width="50" height="50" />} variant="h6" sx={{ color: 'white' }}>
                                Home
                            </Button>
                        </Grid>
                        <Grid item>
                            <DropMenu
                                title="Profiles"
                                url="/profiles"
                                nameKeys={['title']}
                            />
                        </Grid>
                        <Grid item>
                            <DropMenu
                                title="Experience"
                                url="/work-experiences"
                                nameKeys={['position', 'company']}
                            />
                        </Grid>
                        <Grid item>
                            <DropMenu
                                title="Education"
                                url="/educations"
                                nameKeys={['educationLevel', 'degree']}
                            />
                        </Grid>
                        <Grid item>
                            <DropMenu
                                title="Skills"
                                url="/skills"
                                nameKeys={['title']}
                            />
                        </Grid>
                        <Grid item>
                            <DropMenu
                                title="Projects"
                                url="/projects"
                                nameKeys={['title']}
                            />
                        </Grid>
                        <Grid item>
                            <DropMenu
                                title="Links"
                                url="/links"
                                nameKeys={['type']}
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