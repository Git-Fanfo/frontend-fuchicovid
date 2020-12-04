import React, { useState, useEffect, useCallback } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';

import Paper from '@material-ui/core/Paper';
import { lighten, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom';

import * as apiGetService from "../../services/apiGetService";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const type_idItems = [
    { id: 'c.c.', title: 'C.C' },
    { id: 'c.e.', title: 'C.E' },
    { id: 't.i.', title: 'T.I' },
]

let medicamentoss = [];

const initialFValues = {
    id: '',
    tipo_id: 'C.C',
    fecha: '',
    hora : '',
    temperatura : [], 
    peso: [],
    presion : [], 
    observaciones : "",
    id_medicamento : '',
    dosis : '',
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
      paddingDown: '5%',
      position: 'auto',
      top: 20,
    }
  }));

export default function NewEntryReg() {

    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [counter, setCounter] = useState(0)
    const goBack = useCallback(() => history.push('/lobby-service'), [history]);

    const [medicamentos,setMedicamentos] = useState([])
    useEffect(() => {
        async function fetchData() {
          // You can await here
          setMedicamentos(await apiGetService.getMedicamento())
        }
        fetchData();
      }, []);   

    const addMedicamento = () => {
        medicamentoss.push({
            id_medicamento : values.id_medicamento,
            dosis : values.dosis })
        setCounter(medicamentoss.length+' relative')
        abrirInsertado()
    }  

    const abrirInsertado = () => {
        setOpen(true);
    };
    
    const cerrarInsertado = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('id' in fieldValues)
            temp.id = !isNaN(parseInt(fieldValues.id, 10)) ? fieldValues.id.length > 6 ? "" : "Minimum 7 numbers required." : "Numbers only."
        if ('temperatura' in fieldValues)
            temp.temperatura = fieldValues.temperatura.length != 0 ? "" : "This field is required."            
        if ('peso' in fieldValues)
            temp.peso = fieldValues.peso.length != 0 ? "" : "This field is required."      
        if ('presion' in fieldValues)
            temp.presion = fieldValues.presion.length != 0 ? "" : "This field is required."   
        if ('observaciones' in fieldValues)
            temp.observaciones = fieldValues.observaciones.length != 0 ? "" : "This field is required."   
        if ('id_medicamento' in fieldValues)
            temp.id_medicamento = fieldValues.id_medicamento.length != 0 ? "" : "This field is required."   
        if ('dosis' in fieldValues)
            temp.dosis = fieldValues.dosis.length != 0 ? "" : "This field is required."               
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
        e.preventDefault()
        if (validate()){     
            try {    
                let fecha = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                let hora = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();    
                        let datos = []
                            datos.push({
                            id:parseInt(values.id),
                            tipo_id: values.tipo_id,
                            temperatura : values.temperatura,
                            fecha: fecha,
                            hora: hora, 
                            peso : values.peso,  
                            presion : values.presion,
                            observaciones : values.observaciones
                        })
                        datos.push(medicamentoss);   
                        //console.log(datos)    
                let config = {
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(datos)
                }
                //console.log(config.body)
                let res = await fetch('https://shrouded-bastion-95914.herokuapp.com/api/insertarRegistro', config)
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
        <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<ArrowBackIcon />}
                  onClick={goBack}
        >BACK
        </Button>
        <Paper className={classes.visuallyHidden}>
        <Form onSubmit={handleSubmit}>     
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input                    
                        name="id"
                        label="Patient's Identification Number"
                        value={values.id}
                        onChange={handleInputChange}
                        error={errors.id}
                    />
                    <Controls.RadioGroup
                        name="tipo_id"
                        label="Patient's Type ID"
                        value={values.tipo_id}
                        onChange={handleInputChange}
                        items={type_idItems}
                    />
                    <Controls.Select
                        name="id_medicamento"
                        label="Medicine"
                        value={values.id_medicamento}
                        onChange={handleInputChange}
                        options={medicamentos}
                        error={errors.id_medicamento}
                    /> 
                    <Controls.Input                            
                            name="dosis"
                            label="Dose"
                            value={values.dosis}
                            onChange={handleInputChange}
                            error={errors.dosis}
                    /> 
                    <div>
                        <Controls.Button
                            text="Add new medicine"
                            onClick={addMedicamento}

                        />
                    </div>
                </Grid>
                <Grid item xs={6}>                                   
                    <Controls.Input                            
                            name="temperatura"
                            label="Body temperature (in °C)"
                            value={values.temperatura}
                            onChange={handleInputChange}
                            error={errors.temperatura}
                    />
                    <Controls.Input                            
                            name="peso"
                            label="Body weight (in Kg)"
                            value={values.peso}
                            onChange={handleInputChange}
                            error={errors.peso}
                    />
                    <Controls.Input                            
                            name="presion"
                            label="Blood pressure (in mmHg)"
                            value={values.presion}
                            onChange={handleInputChange}
                            error={errors.presion}
                    />               
                    <Controls.Input                            
                            name="observaciones"
                            label="Medical observations"
                            value={values.observaciones}
                            onChange={handleInputChange}
                            error={errors.observaciones}
                    />                    
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit"/>
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm}/>
                    </div>
                </Grid>
            </Grid>
        </Form>
    </Paper>
    <Snackbar open={open} autoHideDuration={5000} onClose={cerrarInsertado}>
                            <Alert onClose={cerrarInsertado} severity="success">
                            Added {counter}!
                            </Alert>
                        </Snackbar>
    </div>
    )
}

/*

<Controls.Select
                        name="id_medicamento"
                        label="Neighborhood"
                        value={values.id_medicamento}
                        onChange={handleInputChange}
                        options={apiGetService.getMedicamento()}
                        error={errors.id_medicamento}
                    />




                            onClick={addMedicamento}



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