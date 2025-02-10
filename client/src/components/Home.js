import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Base from './Base';

const Home = () => {
    return (
        <Base>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Welcome to Smart Resume!
                </Typography>
            </Box>
        </Base>
    );
};

export default Home;