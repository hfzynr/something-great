import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import Menu from '../user/Menu'

    const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    }));

    export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <Menu />
                <Typography variant="h6" className={classes.title}>
                </Typography>
                </Toolbar>
            </AppBar>

            <Switch>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
            </Switch>
            </div>
        </Router>
    );
    }