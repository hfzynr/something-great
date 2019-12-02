import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

export default function SimpleMenu() {
const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = event => {
    setAnchorEl(event.currentTarget);
};

const handleClose = () => {
    setAnchorEl(null);
};

return (
    <div>
        <Router />
    <Button
    variant="outlined"
    aria-controls="simple-menu" 
    aria-haspopup="true" 
    onClick={handleClick}>
        Click Me!!
    </Button>
    <Menu
        color="inherit"
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
    >
        <MenuItem onClick={handleClose}component={Link} to ="/">Home</MenuItem>
        <MenuItem onClick={handleClose}component={Link} to ="/signup">Sign Up</MenuItem>
        <MenuItem onClick={handleClose}component={Link} to ="/signin">Sign In</MenuItem>
    </Menu>
    </div>
);
}