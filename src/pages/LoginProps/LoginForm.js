import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as loginService from "../../services/loginService";
//import Alert from '../../components/TestAlert';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

class LoginForm extends React.Component {
    constructor(props){
        super(props)

        this.state={
            formulario: (
                        <Form onSubmit={this.handleSubmit}>
                    
                    <Grid container justify="center">
                        <Grid item xs={6}>
                            <Controls.Input
                                name="username"
                                label="Username"
                                value={values.username}
                                onChange={this.handleInputChange}
                                error={errors.username}
                            />
                            <Controls.Input
                                name="password"
                                label="Password"
                                type="password"
                                value={values.password}
                                onChange={this.handleInputChange}
                                error={errors.password}
                            />              

                            <div>
                                <Controls.Button
                                    type="submit"
                                    text="Login"                        
                                    />
                                
                                <Controls.Button
                                    text="See Data"
                                    color="default"
                                    color="secondary"
                                    onClick={resetForm}/>
                            </div>
                        </Grid>
                        
                    </Grid>
                </Form>
            ),
            notification:(''),
            ready: true
        }
    }

    Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    sendAlert(){
        handleClick()
        return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
            Logged in!
            </Alert>
        </Snackbar>
        )
    }

    handleSubmit = async e => {
        e.preventDefault();
        try {
            //this.setState({ready:false})
            //let res = await fetch('http://localhost:7000/api/consultar');
            //let data = await res.json(); 

            this.setState({
                //data:data,
                formulario:this.state.Inputformulario,
                notification: this.state.notification,//this.sendAlert(),
                ready:true
            })
        } catch (error) {
            
        }
    }
    render(){

        return (
            <React.Fragment>
            {this.state.formulario}
            </React.Fragment>
        )
    }

}

export default LoginForm;