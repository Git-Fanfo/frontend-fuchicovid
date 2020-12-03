import React, { useState, useEffect, useCallback } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
//import * as patientService from "../../services/patientService.js";

import Paper from '@material-ui/core/Paper';
import { lighten, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom';

const type_idItems = [
    { id: 'c.c.', title: 'C.C.' },
    { id: 'c.e.', title: 'C.E.' },
    { id: 't.i.', title: 'T.I.' },
]

const initialFValues = {
    id: 0,
    nombre: '',
    apellido: '',
    type_id: 'C.C.',
    id_Number: '',
    Neighborhood : '',
    Address : '',
    companions : '',
    place_of_contagion : '',
    geolocation: '',
   //Si queremos poner calendario al final, poner new Date aqui
    fecha: '',
    //isPermanent: false,
    hora : '',
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
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));

export default function PatientForm() {

    const classes = useStyles();
    const history = useHistory();
    const goBack = useCallback(() => history.push('/lobby-service'), [history]);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        /*
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('college' in fieldValues)
            temp.college = (/$^|.+@.+..+/).test(fieldValues.college) ? "" : "college is not valid."
        if ('id_Number' in fieldValues)
            temp.id_Number = fieldValues.id_Number.length > 9 ? "" : "Minimum 10 numbers required."
        if ('neighborhoodId' in fieldValues)
            temp.neighborhoodId = fieldValues.neighborhoodId.length != 0 ? "" : "This field is required."        
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
            let fecha = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
            let hora = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            values.fecha = fecha;
            values.hora = hora;
            console.log(values);
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
            <Grid container>
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
                        name="type_id"
                        label="Type ID"
                        value={values.type_id}
                        onChange={handleInputChange}
                        items={type_idItems}
                    />
                    
                    <Controls.Input                    
                        name="id_Number"
                        label="Identification Number"
                        value={values.id_Number}
                        onChange={handleInputChange}
                        error={errors.id_Number}
                    />   

                    <Controls.Input                    
                        name="neighborhood"
                        label="Neighborhood"
                        value={values.neighborhood}
                        onChange={handleInputChange}
                        error={errors.neighborhood}
                    />               

               </Grid>
                <Grid item xs={6}>
                    
                    <Controls.Input                    
                        name="address"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                        error={errors.address}
                    /> 

                    <Controls.Input                            
                            name="geolocation"
                            label="Geolocation"
                            value={values.geolocation}
                            onChange={handleInputChange}
                            error={errors.geolocation}
                        />
                        <Controls.Input                            
                            name="housemates"
                            label="Number of housemates"
                            value={values.housemates}
                            onChange={handleInputChange}
                            error={errors.housemates}
                        />
                         <Controls.Input                            
                            name="companions"
                            label="Name of the companion"
                            value={values.companions}
                            onChange={handleInputChange}
                            error={errors.companions}
                        />
                         <Controls.Input                            
                            name="place_of_contagion"
                            label="Place of contagion"
                            value={values.place_of_contagion}
                            onChange={handleInputChange}
                            error={errors.place_of_contagion}
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