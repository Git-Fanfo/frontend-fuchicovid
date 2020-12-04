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
const initialFvaluesP = {
    nombre: '',
    apellido: '',
    tipo_id: 'C.C',
    id: '',
    id_barrio: '',
    direccion : '',
    companions : '',
    ciudad_contagio : '',
    lat: '',
    long: '',
    fecha: '',
    hora : '',
    register_by : '_',
    edad: '',
    num_habitantes: '',
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

export default function PatientPerson() {

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

    const validate = (fieldvaluesP = valuesP) => {
        let temp = { ...errors }
        if ('fullName' in fieldvaluesP)
            temp.fullName = fieldvaluesP.fullName ? "" : "This field is required."
        
        setErrors({
            ...temp
        })

        if (fieldvaluesP == valuesP)
            return Object.valuesP(temp).every(x => x == "")
    }


    const {
        valuesP,
        setvaluesP,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFvaluesP, true, validate);

    const handleSubmit = e => {
        let today = new Date();
        e.preventDefault()
        if (validate()){            
            let fecha = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let hora = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            valuesP.fecha = fecha;
            valuesP.hora = hora;
            console.log(valuesP);
            //patientService.insertPatient(valuesP)
            resetForm()            
        }
        //console.log(patientService.getAllPatients())
    }

    return (
        <div className={classes.root}>
        <Form onSubmit={handleSubmit}> 
            <Grid container >
                <Grid item xs={12}>
                    <Controls.Input
                        name="nombre"
                        label="Name"
                        value={valuesP.nombre}
                        onChange={handleInputChange}
                        error={errors.nombre}
                    />
                    <Controls.Input
                        name="apellido"
                        label="Last Name"
                        value={valuesP.apellido}
                        onChange={handleInputChange}
                        error={errors.apellido}
                    />
                    <Controls.RadioGroup
                        name="tipo_id"
                        label="Type ID"
                        value={valuesP.tipo_id}
                        onChange={handleInputChange}
                        items={tipo_idItems}
                    />
                    
                    <Controls.Input                    
                        name="id"
                        label="Identification Number"
                        value={valuesP.id}
                        onChange={handleInputChange}
                        error={errors.id}
                    />   
                    <Controls.Select
                        name="id_barrio"
                        label="Neighborhood"
                        value={valuesP.id_barrio}
                        onChange={handleInputChange}
                        options={barrios}
                        error={errors.id_barrio}
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
    </div>
    )
}

/*

                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Patient"
                        value={valuesP.isPermanent}
                        onChange={handleInputChange}
                    />


<Controls.DatePicker
                        name="fecha"
                        label="Register Date"
                        value={valuesP.fecha}
                        onChange={handleInputChange}
                    />

*/