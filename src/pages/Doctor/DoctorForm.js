import React, { useState, useEffect, useCallback } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';


import Paper from '@material-ui/core/Paper';
import { lighten, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom';

import * as apiGetService from "../../services/apiGetService";
import * as loginService from "../../services/loginService";

const type_idItems = [
    { id: 'c.c.', title: 'C.C' },
    { id: 'c.e.', title: 'C.E' },
    { id: 't.i.', title: 'T.I' },
]

const initialFValues = {
    nombre: '',
    apellido: '',
    id_universidad: '',
    id: '',
    direccion: '',
    tipo_id: 'C.C',
    id_barrio: '',
    id_eps: '',
    //Si queremos poner calendario al final, poner new Date aqui
    fecha: '',
    //isPermanent: false,
    hora : '',

    register_by : 'Admin-01',
    userName : '',
    password : ''
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        paddingLeft: '5%',
        paddingTop: '5%',
        paddingBottom: '5%',
        position: 'auto',
        top: 20,
      }
  }));

export default function DoctorForm() {

    const classes = useStyles();
    const history = useHistory();
    const goBack = useCallback(() => history.push('/lobby-service'), [history]);

    const [barrios,setBarrios] = useState([])
    const [universidad,setUniversidad] = useState([])
    const [eps,setEps] = useState([])

    useEffect(() => {
        async function fetchData() {
          // You can await here
          setBarrios(await apiGetService.getBarrio())
          setUniversidad(await apiGetService.getUniversidad())
          setEps(await apiGetService.getEps())
        }
        fetchData();
      }, []); 

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nombre' in fieldValues)
            temp.nombre = fieldValues.nombre ? "" : "This field is required."
        if ('apellido' in fieldValues)
            temp.apellido = fieldValues.apellido ? "" : "This field is required."
        if ('id_universidad' in fieldValues)
            temp.id_universidad = (/$^|.+@.+..+/).test(fieldValues.id_universidad) ? "" : "id_universidad is not valid."
        if ('id' in fieldValues)
            temp.id = fieldValues.id.length > 6 ? "" : "Minimum 7 numbers required."
        if ('direccion' in fieldValues)
            temp.direccion = fieldValues.direccion ? "" : "This field is required."            
        if ('id_universidad' in fieldValues)
            temp.id_universidad = fieldValues.id_universidad ? "" : "This field is required."      
        if ('id_barrio' in fieldValues)
            temp.id_barrio = fieldValues.id_barrio.length != 0 ? "" : "This field is required."   
        if ('id_eps' in fieldValues)
            temp.id_eps = fieldValues.id_eps.length != 0 ? "" : "This field is required."             
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

    const handleSubmit = async e => {
        let today = new Date();
        let nombre = 'Admin-01'

        e.preventDefault()
        if (validate()){               
            try {
            let fecha = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let hora = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            values.fecha = fecha;
            values.hora = hora;
            values.id = parseInt(values.id)
            values.register_by = nombre
            console.log(values)     
            let config = {
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(values)
            }
            //console.log(config.body)
            let res = await fetch('https://shrouded-bastion-95914.herokuapp.com/api/insertarProfesional', config)
            let json = await res.json()

            if(json.length===0){
                //handleClick()                   
            }else{      
                console.log(json)              
                resetForm()  
                goBack()                            
            }                               
            } catch (error) {
                //this.props.history.push('/')
                console.log('ohno :o')
                //console.log(error)                
            }       
        }
    }

    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
        <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<ArrowBackIcon />}
                  onClick={goBack}
        >BACK
        </Button>
        <Form onSubmit={handleSubmit}>     
            <Grid container className={classes.visuallyHidden}>
                <Grid item xs={6}>
                    <Controls.Input
                        name="nombre"
                        label="Name"
                        value={values.nombre}
                        onChange={handleInputChange}
                        error={errors.nombre}
                    />
                    <Controls.Input
                        name="apellido"
                        label="Last Name"
                        value={values.apellido}
                        onChange={handleInputChange}
                        error={errors.apellido}
                    />
                    <Controls.RadioGroup
                        name="tipo_id"
                        label="Type ID"
                        value={values.tipo_id}
                        onChange={handleInputChange}
                        items={type_idItems}
                    />
                    
                    <Controls.Input                    
                        name="id"
                        label="Identification Number"
                        value={values.id}
                        onChange={handleInputChange}
                        error={errors.id}
                    />
                    <Controls.Input                            
                        name="direccion"
                        label="Address"
                        value={values.direccion}
                        onChange={handleInputChange}
                        error={errors.direccion}
                    /> 
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="id_barrio"
                        label="Neighborhood"
                        value={values.id_barrio}
                        onChange={handleInputChange}
                        options={barrios}
                        error={errors.id_barrio}
                    />
                    <Controls.Select
                        name="id_universidad"
                        label="College"
                        value={values.id_universidad}
                        onChange={handleInputChange}
                        options={universidad}
                        error={errors.id_universidad}
                    />                      
                    <Controls.Select
                        name="id_eps"
                        label="EPS"
                        value={values.id_eps}
                        onChange={handleInputChange}
                        options={eps}
                        error={errors.id_eps}
                    />
                    <Controls.Input                            
                        name="userName"
                        label="Username"
                        value={values.userName}
                        onChange={handleInputChange}
                        error={errors.userName}
                    />
                    <Controls.Input                            
                        name="password"
                        label="Password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        type="password"
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm}/>
                    </div>
                </Grid>
            </Grid>
        </Form>
    </Paper>
    </div>
    )
}

/*

<Controls.Select
                        name="id_barrio"
                        label="Neighborhood"
                        value={values.id_barrio}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.id_barrio}
                    />

<Controls.Select
                        name="id_eps"
                        label="EPS"
                        value={values.id_eps}
                        onChange={handleInputChange}
                        options={employeeService.getEPS()}
                        error={errors.id_eps}
                    />



<Controls.Select
                        name="id_medicamento"
                        label="Medicine"
                        value={values.id_medicamento}
                        onChange={handleInputChange}
                        options={medicamentos}
                        error={errors.id_medicamento}
                    /> 





                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />


<Controls.DatePicker
                        name="fecha"
                        label="Register Date"
                        value={values.fecha}
                        onChange={handleInputChange}
                    />

*/