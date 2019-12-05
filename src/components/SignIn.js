import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, ErrorMessage } from "formik";
import { validationForm } from "./js/SignInValidation.js";
import { withRouter } from "react-router-dom";
import swal from 'sweetalert'
import { axios } from '../helpers'

const useStyles = makeStyles(theme => ({
paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
},
avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
},
form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
},
submit: {
    margin: theme.spacing(3, 0, 2)
}
}));

function SignIn(props) {
const classes = useStyles();
return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Sign in
        </Typography>

        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validate={validationForm}
            onSubmit={values => {
                axios()
                    .post(`/user/login`, values)
                    .then(response => {
                        console.log(response.data);
                        
                        if (response.status === 200) {
                            localStorage.setItem(
                                "token",
                                JSON.stringify(response.data.token)
                            );
                            props.history.push("/home");
                            swal({
                                title: 'Anda Sukses Log In',
                                icon: 'success'
                            })
                        }
                    });
            }}
        >
                {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
        }) => (
            <form 
            className={classes.form} 
            noValidate
            onSubmit={handleSubmit}
            >
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                autoFocus
            />
            <p
                style={{
                color: "red",
                fontStyle: "italic"
                }}
            >
                <ErrorMessage name="email" />
            </p>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
            />
            <p
                style={{
                color: "red",
                fontStyle: "italic"
                }}
            >
                <ErrorMessage name="password" />
            </p>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item>
                <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </form>
        )}
        </Formik>
    </div>
    </Container>
);
}

export default withRouter(SignIn);