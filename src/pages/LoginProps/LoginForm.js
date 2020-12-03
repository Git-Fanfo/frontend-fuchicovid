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
    userName: '',
    password: ''
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
        //console.log(fieldValues.userName)
        //console.log(loginService.getLogin())
        if ('userName' in fieldValues)
            temp.userName = fieldValues.userName ? "" : "Please enter a valid username."
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

    const   handleSubmit = async e => {
        
        e.preventDefault()
        if (validate()){
            try {          
                let config = {
                    method:'PUT',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(values)
                }
                //console.log(config.body)
                let res = await fetch('https://shrouded-bastion-95914.herokuapp.com/api/login', config)
                let json = await res.json()

                if(json.length===0){
                    handleClick()                   
                }else{                    
                    loginService.insertLog(json[0])
                    resetForm()  
                    redirect()                            
                }                               
            } catch (error) {
                //this.props.history.push('/')
                console.log('ohno :o')
                //console.log(error)                
            }
        //console.log(this.state)
        }
    }

/*
const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            console.log(values)
            loginService.insertLog(values)
            handleClick()

            redirect()

            resetForm()            
        }
        //console.log(employeeService.getAllEmployees())
    }
*/
    

    return (
        <Form onSubmit={handleSubmit}>
            
            <Grid container justify="center">
                <Grid item xs={6}>
                    <Controls.Input
                        name="userName"
                        label="username"
                        value={values.userName}
                        onChange={handleInputChange}
                        error={errors.userName}
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
                        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error">
                            User not found
                            </Alert>
                        </Snackbar>
                        <Controls.Button
                            text="See Data"
                            color="default"
                            color="secondary"
                            />
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