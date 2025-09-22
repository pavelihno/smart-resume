import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#3357FF',
			light: '#6d7dff',
			dark: '#0c2bd6',
		},
		secondary: {
			main: '#FF6B6B',
			light: '#ff8a8a',
			dark: '#c53d3d',
		},
		background: {
			default: '#f5f6fa',
			paper: '#ffffff',
		},
		text: {
			primary: '#1f2933',
			secondary: '#52606d',
		},
	},
	shape: {
		borderRadius: 14,
	},
	typography: {
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
		h5: {
			fontWeight: 600,
			letterSpacing: 0.4,
		},
		h6: {
			fontWeight: 600,
		},
		button: {
			textTransform: 'none',
			fontWeight: 600,
			letterSpacing: 0.2,
		},
		body1: {
			lineHeight: 1.6,
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: '#f5f6fa',
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					background: 'linear-gradient(135deg, #1f3b8f 0%, #3357FF 40%, #4c8dff 100%)',
					boxShadow: '0 24px 45px rgba(31, 59, 143, 0.22)',
					borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
				},
			},
		},
		MuiToolbar: {
			styleOverrides: {
				root: {
					minHeight: 70,
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 999,
					paddingLeft: 20,
					paddingRight: 20,
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 18,
					boxShadow: '0 28px 55px rgba(15, 23, 42, 0.12)',
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					backgroundColor: '#eef2ff',
					'& .MuiTableCell-root': {
						fontWeight: 600,
						color: '#1f2933',
					},
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					borderRadius: 14,
				},
			},
		},
	},
});

export default theme;
