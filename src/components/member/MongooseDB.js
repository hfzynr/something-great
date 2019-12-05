import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Formik } from "formik";
import swal from 'sweetalert2'
import { verify , axios } from '../../helpers'

const swalWithBootstrapButtons = swal.mixin({
    customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})

export default class TodoMongoose extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    showTodo = () => {
        axios()
            .get(`/todo/email/${verify().email}`)
            .then(response => {
                this.setState({ data: response.data.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount = () => {
    this.showTodo()
    }

    addOne = values => {
        axios()
            .post(`todo/`, {
                ...values,
                name : verify().firstName,
                email : verify().email
            })
            .then(response => {
                if (response.status === 201) {
                    swal.fire(
                        'Added!',
                        'Your todo has been added.',
                        'success'
                    )
                    this.showTodo();
                }
            });
    }

    deleteOne = (id, todo) => {
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                axios()
                    .delete(`todo/${id}`)
                    .then(response => {
                        if (response.status === 200) {
                            swalWithBootstrapButtons.fire(
                                "Deleted!",
                                `Todo ${todo} is deleted.`,
                                "success"
                            );
                        }
                    })
                    .then(() => {
                        this.showTodo();
                    });
            } else if (
            result.dismiss === swal.DismissReason.cancel
            ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Not Deleted !',
                'error'
            )
            }
        })
    }

    updateOne = id => {
        swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1']
        }).queue([
            {
            title: 'Update Todo',
            text: 'Change your todo'
            }
        ]).then((result) => {
            if (result.value) {
            const answer = result.value
            const data = answer.toString()
            
            axios()
                    .put(`todo/${id}`, {todo : data})
                    .then(response => {
                        if (response.status === 200) {
                            
                            swal.fire({
                                title: 'All done!',
                                html: `
                                Your Todo has been update:
                                <pre><code>${answer}</code></pre>
                                `,
                                confirmButtonText: 'Done!'
                            })
                            this.showTodo();
                        } else {
                            swal.fire(
                                'Cancelled',
                                'Theres some error when update',
                                'error'
                            )
                        }
                    })
            }
        })
    }

    render () {
        return (
            <div>
                <Formik
                initialValues={{
                    todo: ""
                }}
                onSubmit={values => {
                    this.addOne(values);
                }}
                >
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                    <form style={{textAlign:"center", marginTop:"50px"}} onSubmit={handleSubmit} autoComplete="off">
                        <TextField 
                            id="todo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            defaultValue={values.todo} 
                            label="Add Todo" 
                            variant="outlined" />
                        <Button style={{marginLeft:"20px"}} type="submit" variant="contained" color="primary">ADD</Button>
                    </form>
                    )}
                </Formik>
                {this.state.data.length > 0 && this.state.data.map(({name, todo, _id}, key) => {
                    return (
                        <Paper key={key} style={{width: "40%", margin:"0 auto", marginTop: "50px"}} >
                            <div style={{padding:"25px"}}>
                                <Typography variant="h5" component="h3">
                                    {name}
                                </Typography>
                                <Typography component="p">
                                    Todo - {todo}
                                </Typography>
                                <div style={{marginTop: "20px"}}>
                                    <Button variant="contained" color="primary" onClick={() =>this.updateOne(_id)}>
                                        Edit
                                    </Button>

                                    <Button style={{marginLeft:"20px"}} variant="contained" color="secondary" onClick={() =>this.deleteOne(_id, todo)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Paper>
                    )
                })}
            </div>
        );
    }
}
