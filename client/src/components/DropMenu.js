import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuList, MenuItem, ListItemButton, ListItemText, Container, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import { api } from '../api';

const DropMenu = ({ title, nameKeys, url }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(url);
                const data = response.data.slice(0, 5).map(item => ({
                    ...item,
                    _name: nameKeys.map(key => item[key]).join(', ')
                }));
                setItems(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container>
            <Button onClick={handleMenuOpen} color="inherit" variant="button">
                {title}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                dense="true"
            >
                <MenuList dense={true} style={{ minWidth: '7rem' }}>
                    {isLoading ? (
                        <MenuItem>
                            <Skeleton animation="wave" style={{ width: '100%' }} />
                        </MenuItem>
                    ) : (
                        items.map((item) => (
                            <ListItemButton key={item._id} onClick={handleMenuClose} component={Link} to={`${url}/${item._id}`} title={`Go to ${item._name}`}>
                                <ListItemText primary={item._name} />
                            </ListItemButton>
                        ))
                    )}
                    <MenuItem>
                        <ListItemButton key="Add" onClick={handleMenuClose} component={Link} to={`${url}/new`} title="Add new">
                            <ListItemText primary={<AddIcon />} />
                        </ListItemButton>
                        <ListItemButton key="More" onClick={handleMenuClose} component={Link} to={`${url}`} title="View more">
                            <ListItemText primary={<FormatListBulletedIcon />} />
                        </ListItemButton>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Container>
    );
};

export default DropMenu;