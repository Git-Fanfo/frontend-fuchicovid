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

const tipo_idItems = [
    { id: 'c.c.', title: 'C.C' },
    { id: 'c.e.', title: 'C.E' },
    { id: 't.i.', title: 'T.I' },
]

let numeros = []
let mail = []
let pariente = []

const initialFValues = {
    nombre: '',
    apellido: '',
    tipo_id: 'C.C',
    id: 0,
    id_barrio: '',
    direccion : '',
    companions : '',
    ciudad_contagio : '',
    lat: '',
    long: '',
    fecha: '',
    hora : '',
    register_by : 'admin',
    edad: 0,
    num_habitantes: 0,
    id_pariente:0,
    tipo_id:101,
	nombre_completo:'',
	id_parentesco:''
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
      position: 'auto',
      top: 20,
    },
  }));  

export default function PatientForm() {

    const classes = useStyles();
    const history = useHistory();
    const goBack = useCallback(() => history.push('/lobby-service'), [history]);

    const [barrios,setBarrios] = useState([])
    useEffect(() => {
        async function fetchData() {
          // You can await here
          setBarrios(await apiGetService.getBarrio())
        }
        fetchData();
      }, []);

      const addPariente = () => {
        pariente.push({
            nombre_completo:values.nombre_completo,
        })
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        /*
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('college' in fieldValues)
            temp.college = (/$^|.+@.+..+/).test(fieldValues.college) ? "" : "college is not valid."
        if ('id' in fieldValues)
            temp.id = fieldValues.id.length > 9 ? "" : "Minimum 10 numbers required."
        if ('id_barrio' in fieldValues)
            temp.id_barrio = fieldValues.id_barrio.length != 0 ? "" : "This field is required."        
        */
        
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

            let datos = []
            datos.push({
                id:values.id,
                tipo_id: values.tipo_id,
                nombre: values.nombre, 
                apellido: values.apellido,
                fecha: fecha,
                hora: hora, 
                direccion: values.direccion, 
                id_barrio:values.id_barrio, 
                register_by:values.register_by, 
                edad:values.edad,
                lat:values.lat,
                long:values.long,
                id_profesional:values.id_profesional,
                num_habitantes:values.num_habitantes,
                ciudad_contagio:values.ciudad_contagio
            })
            datos.push(numeros)
            datos.push(mail)
            datos.push(pariente)



            console.log(datos);
            //patientService.insertPatient(values)
            resetForm()            
        }
        //console.log(patientService.getAllPatients())
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
                        items={tipo_idItems}
                    />
                    
                    <Controls.Input                    
                        name="id"
                        label="Identification Number"
                        value={values.id}
                        onChange={handleInputChange}
                        error={errors.id}
                    />   
                    <Controls.Select
                        name="id_barrio"
                        label="Neighborhood"
                        value={values.id_barrio}
                        onChange={handleInputChange}
                        options={barrios}
                        error={errors.id_barrio}
                    />   

               </Grid>
                <Grid item xs={6}>
                    
                    <Controls.Input                    
                        name="direccion"
                        label="Direccion"
                        value={values.direccion}
                        onChange={handleInputChange}
                        error={errors.direccion}
                    /> 

                    <Controls.Input                            
                            name="edad"
                            label="Edad"
                            value={values.edad}
                            onChange={handleInputChange}
                            error={errors.edad}
                        />
                        <Controls.Input                            
                            name="num_habitantes"
                            label="Number of housemates"
                            value={values.num_habitantes}
                            onChange={handleInputChange}
                            error={errors.num_habitantes}
                        />
                         <Controls.Input                            
                            name="companions"
                            label="Name of the companion"
                            value={values.companions}
                            onChange={handleInputChange}
                            error={errors.companions}
                        />
                         <Controls.Input                            
                            name="ciudad_contagio"
                            label="Place of contagion"
                            value={values.ciudad_contagio}
                            onChange={handleInputChange}
                            error={errors.ciudad_contagio}
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
                <Grid item xs={6}>
                    <Controls.Input
                        name="nombre_completo"
                        label="Name"
                        value={values.nombre_completo}
                        onChange={handleInputChange}
                        error={errors.nombre_completo}
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
                        items={tipo_idItems}
                    />
                    
                    <Controls.Input                    
                        name="id"
                        label="Identification Number"
                        value={values.id}
                        onChange={handleInputChange}
                        error={errors.id}
                    />   
                    <Controls.Select
                        name="id_barrio"
                        label="Neighborhood"
                        value={values.id_barrio}
                        onChange={handleInputChange}
                        options={barrios}
                        error={errors.id_barrio}
                    />  
                    <Controls.Button
                            text="Submit"
                            onClick={addPariente} />
               </Grid>             
            </Grid>
        </Form>
    </Paper>
    </div>
    )
}

/*

                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Patient"
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