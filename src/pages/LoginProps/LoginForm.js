import React, { useState, useEffect, useCallback } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as loginService from "../../services/loginService";
//import Alert from '../../components/TestAlert';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useHistory} from 'react-router-dom';


console.log('Closing session...')
localStorage.clear()
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const initialFValues = {
    id: 0,
    username: '',
    password: '',
    //Si queremos poner calendario al final, poner new Date aqui
    registerDate: '',
    //isPermanent: false,
    hour : ''
}

export default function LoginForm() {
    //redireccionar https://stackoverflow.com/questions/29244731/react-router-how-to-manually-invoke-link
    const history = useHistory();
    const redirect = useCallback(() => history.push('/lobby-service'), [history]);

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const validate = (fieldValues = values) => {
        let temp = { ...errors }        
        //console.log(fieldValues.username)
        //console.log(loginService.getLogin())
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "Please enter a valid username."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "Please enter a valid password." 
        //Aqui revisa si existe el usuario  
        let ans = loginService.getLogin()//esto es un array
       
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        let today = new Date();
        e.preventDefault()
        if (validate()){            
            let fecha = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let hora = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            values.registerDate = fecha;
            values.hour = hora;
            loginService.insertLog(values)
            console.log("esconder login")
            handleClick()

            redirect()

            resetForm()            
        }
        //console.log(employeeService.getAllEmployees())
    }

    return (
        <Form onSubmit={handleSubmit}>
            
            <Grid container justify="center">
                <Grid item xs={6}>
                    <Controls.Input
                        name="username"
                        label="Username"
                        value={values.username}
                        onChange={handleInputChange}
                        error={errors.username}
                    />
                    <Controls.Input
                        name="password"
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />              

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Login"                        
                             />
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                            Logged in!
                            </Alert>
                        </Snackbar>
                        <Controls.Button
                            text="See Data"
                            color="default"
                            color="secondary"
                            onClick={localStorage.clear()}/>
                    </div>
                </Grid>
                
            </Grid>
        </Form>
    )
}

/*

                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />


<Controls.DatePicker
                        name="registerDate"
                        label="Register Date"
                        value={values.registerDate}
                        onChange={handleInputChange}
                    />

*/