import React, { Component } from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import { Formik, ErrorMessage } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { verify } from '../../helpers'

const API = process.env.REACT_APP_API_LIVE;

export default class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            edit: false,
            todo: ""
        };
    }

    fetch = () => {

        axios
            .get(`${API}/todo/email/${verify().email}`)
            .then(response => {
                this.setState({ todos: response.data.token });
            })
            .catch(error => {
                console.log(error);
            });
    };

    componentDidMount = () => {
        this.fetch();
    };

    deleteOne = id => {
        axios
            .delete(`${API}/todo/${id}`)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire(
                        "Deleted!",
                        `Your todo with id: ${id} is deleted.`,
                        "success"
                    );
                }
            })
            .then(() => {
                this.fetch();
            });
    };

    addOne = values => {
        axios
            .post(`${API}/todo`, {
                ...values,
                name: verify().firstName,
                email: verify().email
            })
            .then(response => {
                if (response.status === 201) {
                    Swal.fire("Added!", `Your new todo is added`, "success");
                    this.fetch();
                }
            });
    };

    editOne = id => {
        this.setState({ id: id})
        this.setState({ edit: true });

        axios.get(`${API}/todo/${id}`).then(response => {
            this.setState({ todo: response.data.data.todo });
        });
    };

    updateOne = values => {
        axios
            .put(`${API}/todo/${this.state.id}`, {
                ...values
            })
            .then(response => {
                if (response.status === 200) {
                    Swal.fire("Added!", `Your new todo is added`, "success");
                    this.fetch();
                }
            });
    };

    render() {
        return (
            <Grid 
            container spacing={1}
            style={{ paddingTop:60}}>
                <Grid container justify="center" item xs={12} spacing={3}>
                    <Formik
                        initialValues={{
                            todo: ""
                        }}
                        enableReinitialize={true}
                        onSubmit={values => {
                            this.state.edit
                                ? this.updateOne(values)
                                : this.addOne(values);
                        }}
                    >
                        {({
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            autoComplete="todo"
                                            name="todo"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="todo"
                                            label="Todo"
                                            autoFocus
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            defaultValue={
                                                this.state.todo !== ""
                                                    ? this.state.todo
                                                    : values.todo
                                            }
                                        />
                                        <p
                                            style={{
                                                color: "red",
                                                fontStyle: "italic"
                                            }}
                                        >
                                            <ErrorMessage name="firstName" />
                                        </p>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    {!this.state.edit ? "Add" : "Edit"}
                                </Button>
                            </form>
                        )}
                    </Formik>
                    <List
                        style={{
                            width: "30%"
                        }}
                    >
                        {this.state.todos.length > 0 &&
                            this.state.todos.map((item, key) => {
                                return (
                                    <React.Fragment key={key}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText
                                                primary={item.name}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            align="center"
                                                            component="span"
                                                            variant="body2"
                                                            color="textPrimary"
                                                        >
                                                            {`todo -
                                                                ${item.todo}`}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />

                                            <Button 
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            style={{ marginRight:6}}>
                                            <EditIcon
                                                onClick={() => {
                                                    this.editOne(item._id);
                                                }}
                                            />
                                            </Button>

                                            <Button 
                                            type="submit"
                                            variant="contained"
                                            color="primary">
                                            <DeleteIcon
                                                onClick={() =>
                                                    this.deleteOne(item._id)
                                                }
                                            />
                                            </Button>

                                        </ListItem>
                                        <Divider
                                            variant="middle"
                                            component="li"
                                        />
                                    </React.Fragment>
                                );
                            })}
                    </List>
                </Grid>
            </Grid>
        );
    }
}