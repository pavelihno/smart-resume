import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, CssBaseline, Typography, Box, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../theme';

const NAV_ITEMS = [
	{ label: 'Profiles', to: '/profiles' },
	{ label: 'Cover Letters', to: '/cover-letters' },
	{ label: 'Experience', to: '/work-experiences' },
	{ label: 'Education', to: '/educations' },
	{ label: 'Skills', to: '/skills' },
	{ label: 'Projects', to: '/projects' },
	{ label: 'Links', to: '/links' },
];

const Base = ({ children }) => {
	const location = useLocation();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box
				sx={{
					minHeight: '100vh',
					background: `radial-gradient(circle at 20% 20%, rgba(103, 116, 255, 0.15), transparent 45%),
						radial-gradient(circle at 80% 0%, rgba(255, 118, 118, 0.18), transparent 45%),
						${theme.palette.background.default}`,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<AppBar
					position='sticky'
					sx={{
						backgroundImage: 'none',
						backgroundColor: 'rgba(26, 49, 120, 0.95)',
						backdropFilter: 'blur(14px)',
						borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
					}}
				>
					<Toolbar sx={{ justifyContent: 'space-between', gap: 3 }}>
						<Button
							component={Link}
							to='/'
							startIcon={<img src='/images/logo.png' alt='Logo' width='42' height='42' />}
							sx={{
								color: '#fff',
								fontWeight: 700,
								fontSize: '1rem',
							}}
						>
							Smart Resume
						</Button>
						<Stack direction='row' spacing={{ xs: 1, md: 1.5 }} alignItems='center'>
							{NAV_ITEMS.map((item) => {
								const isActive = location.pathname.startsWith(item.to);
								return (
									<Button
										key={item.to}
										component={Link}
										to={item.to}
										variant={isActive ? 'contained' : 'text'}
										color={isActive ? 'secondary' : 'inherit'}
										sx={{
											color: isActive ? '#fff' : 'rgba(255,255,255,0.88)',
											fontWeight: isActive ? 700 : 500,
										}}
									>
										{item.label}
									</Button>
								);
							})}
						</Stack>
					</Toolbar>
				</AppBar>

				<Container
					component='main'
					maxWidth='lg'
					sx={{
						flexGrow: 1,
						py: { xs: 4, md: 6 },
					}}
				>
					{children}
				</Container>

				<Container component='footer' maxWidth='lg' sx={{ py: 4 }}>
					<Typography variant='body2' align='center' color='text.secondary'>
						<Link
							to='https://github.com/pavelihno'
							target='_blank'
							style={{ color: 'inherit', textDecoration: 'none' }}
						>
							© {new Date().getFullYear()} Smart Resume. Crafted with passion.
						</Link>
					</Typography>
				</Container>
			</Box>
		</ThemeProvider>
	);
};

export default Base;
