import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
    Link
} from "react-router-dom";
import swal from 'sweetalert'

export default function SimpleMenu() {
const [anchorEl, setAnchorEl] = React.useState(null);

const logOut = () => {
    localStorage.removeItem("token");
    swal({
        title: 'Anda Sukses Log Out',
        icon: 'success'
    })
};

const handleClick = event => {
    setAnchorEl(event.currentTarget);
};

const handleClose = () => {
    setAnchorEl(null);
};

return (
    <div>
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
        <MenuItem onClick={handleClose} component={Link} to ="/home">Home</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to ="/mongodb">Mongo DB</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to ="/mongoose">Mongoose DB</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to ="/mysql">MySql DB</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to ="/sequelize">Sequelize</MenuItem>
        <MenuItem component={Link} to ="/" onClick={logOut} >Log out</MenuItem>
    </Menu>
    </div>
);
}