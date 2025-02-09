import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Home = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Welcome to Smart Resume!
            </Typography>
            <Typography variant="body1">
                This is a basic template for the future development of your resume editor.
            </Typography>
        </Box>
    );
};

export default Home;