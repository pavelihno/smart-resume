import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FormatClearIcon from '@mui/icons-material/FormatClear';

const TOOLBAR_ACTIONS = [
	{ command: 'bold', label: 'Bold', icon: <FormatBoldIcon fontSize='small' /> },
	{ command: 'italic', label: 'Italic', icon: <FormatItalicIcon fontSize='small' /> },
	{ command: 'underline', label: 'Underline', icon: <FormatUnderlinedIcon fontSize='small' /> },
	{ command: 'insertUnorderedList', label: 'Bulleted list', icon: <FormatListBulletedIcon fontSize='small' /> },
	{ command: 'insertOrderedList', label: 'Numbered list', icon: <FormatListNumberedIcon fontSize='small' /> },
	{ command: 'createLink', label: 'Add link', icon: <InsertLinkIcon fontSize='small' />, withPrompt: true },
	{ command: 'removeFormat', label: 'Clear formatting', icon: <FormatClearIcon fontSize='small' /> },
];

const sanitizeLink = (url) => {
	try {
		const value = url.trim();
		if (!value) {
			return '';
		}
		const prefixed = /^https?:\/\//i.test(value) ? value : `https://${value}`;
		// eslint-disable-next-line no-new
		new URL(prefixed);
		return prefixed;
	} catch (error) {
		return '';
	}
};

const HtmlEditorField = ({ label, value = '', onChange, helperText }) => {
	const editorRef = useRef(null);
	const [content, setContent] = useState(value || '');

	useEffect(() => {
		if ((value || '') !== content) {
			setContent(value || '');
		}
	}, [value]);

	useEffect(() => {
		if (editorRef.current && editorRef.current.innerHTML !== content) {
			editorRef.current.innerHTML = content;
		}
	}, [content]);

	const handleCommand = (action) => {
		if (!editorRef.current) {
			return;
		}

		editorRef.current.focus();

		if (action.command === 'createLink') {
			const rawUrl = window.prompt('Enter link URL');
			const safeUrl = sanitizeLink(rawUrl || '');
			if (!safeUrl) {
				return;
			}
			document.execCommand(action.command, false, safeUrl);
		} else {
			document.execCommand(action.command, false, undefined);
		}

		const updated = editorRef.current.innerHTML;
		setContent(updated);
		onChange?.(updated);
	};

	const handleInput = (event) => {
		const updated = event.currentTarget.innerHTML;
		setContent(updated);
		onChange?.(updated);
	};

	return (
		<Grid item xs={12}>
			<Stack spacing={1.5}>
				<Box>{label && <Typography variant='subtitle1'>{label}</Typography>}</Box>
				<Stack direction='row' spacing={1} alignItems='center'>
					{TOOLBAR_ACTIONS.map((action) => (
						<Tooltip key={action.command} title={action.label}>
							<IconButton
								size='small'
								onMouseDown={(event) => event.preventDefault()}
								onClick={() => handleCommand(action)}
							>
								{action.icon}
							</IconButton>
						</Tooltip>
					))}
				</Stack>
				<Paper
					elevation={0}
					sx={{
						border: '1px solid rgba(15, 23, 42, 0.16)',
						borderRadius: 2,
						p: 2,
						minHeight: 200,
						backgroundColor: '#fff',
						fontFamily: 'inherit',
					}}
				>
					<Box
						ref={editorRef}
						contentEditable
						suppressContentEditableWarning
						onInput={handleInput}
						onBlur={handleInput}
						sx={{
							outline: 'none',
							minHeight: 180,
							fontSize: '1rem',
							lineHeight: 1.6,
						}}
					/>
				</Paper>
				{helperText && (
					<Typography variant='body2' color='text.secondary'>
						{helperText}
					</Typography>
				)}
			</Stack>
		</Grid>
	);
};

export default HtmlEditorField;
