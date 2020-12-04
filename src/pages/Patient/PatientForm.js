import React, { useState, useEffect, useCallback } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';

import Paper from '@material-ui/core/Paper';
import { lighten, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import * as apiGetService from "../../services/apiGetService";
import * as loginService from "../../services/loginService";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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
    id: '',
    id_barrio: '',
    direccion : '',
    companions : '',
    ciudad_contagio : '',
    lat: '',
    long: '',
    fecha: '',
    hora : '',
    register_by : 'Admin-01',
    edad: '',
    num_habitantes: '',
    id_profesional:'',
    tipo_idP:'C.C',
    nombre_completo:'',
    id_pariente:'',
    id_parentesco:'',
    numero:'',
    email:'',
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
    },
    title: {
        fontSize: '2em',
        color: '#282c34',
        //textAlign: 'center',
        paddingTop: '1em',
    }
  }));  

export default function PatientForm() {

    const classes = useStyles();
    const history = useHistory();
    const goBack = useCallback(() => history.push('/lobby-service'), [history]);

    const [barrios,setBarrios] = useState([])
    const [ciudades, setCiudades] = useState([])
    const [parentesco, setParentesco] = useState([])
    const [profesional, setProfesional] = useState([])

    
    const [open, setOpen] = React.useState(false);
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        async function fetchData() {
          // You can await here
          setBarrios(await apiGetService.getBarrio())
          setCiudades(await apiGetService.getCiudad())
          setParentesco(await apiGetService.getParentesco())
          setProfesional(await apiGetService.getProfesional())
        }
        fetchData();
      }, []);

    const addPariente = () => {
        if(validateRelative()){
            pariente.push({
                nombre_completo:values.nombre_completo,
                tipo_id:values.tipo_idP,
                id_pariente:values.id_pariente,
                id_parentesco:values.id_parentesco,
            })
            setCounter(pariente.length+' relative')
            abrirInsertado()
        }
        
    }

    const addNumber = () => {
        if(validateNumber()){
            numeros.push(values.numero)
            setCounter(numeros.length+' number')
            abrirInsertado()
        }        
    }

    const addMail = () => {
        if(validateMail()){
            mail.push(values.email)
            setCounter(mail.length+' mail')
            abrirInsertado()
        }        
    }

    const abrirInsertado = () => {
        setOpen(true);
      };
    
    const eraseAll = () => {
        resetForm()
        numeros = []
        pariente = []
        mail = []
    }
    const cerrarInsertado = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const getRandomArbitrary =(min, max) => {
        return Math.random() * (max - min) + min;
      }
      /*
    companions : '',
    fecha: '',
    hora : '',
    register_by : 'admin',
    id_pariente:'',
    tipo_idP:'C.C',
	nombre_completo:'',
    id_parentesco:'',
    email:'',     
      
      */

    const checkQueue = (fieldValues = values) => {
        let temp = { ...errors }
        if ('numero' in fieldValues)
            temp.numero = numeros.length >=2 ? "" : "Min 2 numbers. In queue: "+numeros.length+"."
            setErrors({
                ...temp
            })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const checkQueueMail = (fieldValues = values) => {
        let temp = { ...errors }
        if ('email' in fieldValues)
            temp.email = mail.length >=2 ? "" : "Min 2 email. In queue: "+mail.length+"."
            setErrors({
                ...temp
            })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const checkQueueRel = (fieldValues = values) => {
        let temp = { ...errors }
        if(pariente.length <2){
            temp.nombre_completo = "Min 2 name. In queue: "+pariente.length+"."
            temp.id_pariente = "Min 2 id number. In queue: "+pariente.length+"."
            temp.id_parentesco = "Min 2 relationship. In queue: "+pariente.length+"."
        }

            setErrors({
                ...temp
            })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const validateNumber = (fieldValues = values) => {
        let temp = { ...errors }
        if ('numero' in fieldValues)
            temp.numero = !isNaN(parseInt(fieldValues.numero, 10)) ? (fieldValues.numero.length > 6 && fieldValues.numero.length<16) ? "" : "Minimum 7 numbers required" : "Numbers only."
        
       setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const validateMail = (fieldValues = values) => {
        let temp = { ...errors }
        if ('email' in fieldValues)// && !mail.includes(fieldValues.email)
            temp.email = validateEmail(fieldValues.email) ? (fieldValues.email.length<50) ? "" : "Max 50 characters" : "Mail is not valid."        
       setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const validateRelative = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nombre_completo' in fieldValues)
            temp.nombre_completo = fieldValues.nombre_completo ? "" : "This field is required."
        if ('id_pariente' in fieldValues)
            temp.id_pariente = !isNaN(parseInt(fieldValues.id_pariente, 10)) ? fieldValues.id_pariente.length > 6 ? "" : "Minimum 7 numbers required" : "Numbers only."
        if ('id_parentesco' in fieldValues)
            temp.id_parentesco = fieldValues.id_parentesco.length != 0 ? "" : "This field is required."
       setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        
         if ('nombre' in fieldValues)
            temp.nombre = fieldValues.nombre ? "" : "This field is required."
        if ('apellido' in fieldValues)
            temp.apellido = fieldValues.apellido ? "" : "This field is required."
       if ('id' in fieldValues)
            temp.id = !isNaN(parseInt(fieldValues.id, 10)) ? fieldValues.id.length > 6 ? "" : "Minimum 7 numbers required" : "Numbers only."
        if ('direccion' in fieldValues)
            temp.direccion = fieldValues.direccion ? "" : "This field is required."      
        if ('id_barrio' in fieldValues)
            temp.id_barrio = fieldValues.id_barrio.length != 0 ? "" : "This field is required."
        if ('edad' in fieldValues)
            temp.edad = !isNaN(parseInt(fieldValues.edad, 10)) ? fieldValues.edad.length > 0 ? "" : "This field is required" : "Numbers only."
        if ('num_habitantes' in fieldValues)
            temp.num_habitantes = !isNaN(parseInt(fieldValues.num_habitantes, 10)) ? (fieldValues.num_habitantes.length > 0 && fieldValues.num_habitantes%1==0) ? "" : "This field is required" : "Numbers only."
        if ('id_profesional' in fieldValues)
            temp.id_profesional = fieldValues.id_profesional.length != 0 ? "" : "This field is required."
        if ('ciudad_contagio' in fieldValues)
            temp.ciudad_contagio = fieldValues.ciudad_contagio.length != 0 ? "" : "This field is required."

        //if ('numero' in fieldValues)
        //    temp.numero = numeros.length >=2 ? "" : "Min 2 numbers. In queue: "+numeros.length+"."

        //if ('email' in fieldValues)
        //    temp.email = mail.length >=2 ? "" : "Min 2 email. In queue: "+mail.length+"."
        
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
            let today = new Date();

            let nombre = 'Admin-01'
            console.log(loginService.getAllUsers())
            /*
            try{
                    nombre = loginService.getAllUsers().user_name
                }
                catch{
                    nombre = 'Admin-01'
                }
            */
                
                
        if (validate() && checkQueue() && checkQueueMail() && checkQueueRel()){
            try {        
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
                    register_by:nombre, 
                    edad: parseInt(values.edad, 10),
                    lat:parseFloat((getRandomArbitrary(342417, 345648)/100000).toFixed(9)),
                    long:parseFloat((getRandomArbitrary(-7651282, -7649471)/100000).toFixed(9)),
                    id_profesional:values.id_profesional,
                    num_habitantes:parseInt(values.num_habitantes,10),
                    ciudad_contagio:values.ciudad_contagio
                })
                
                datos.push(numeros)
                datos.push(mail)
                datos.push(pariente)
                

                let config = {
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(datos)
                }
                //console.log(config.body)
                let res = await fetch('https://shrouded-bastion-95914.herokuapp.com/api/insertarPaciente', config)
                let json = await res.json()

                console.log(json)
                resetForm()        
                goBack()                               
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
        let today = new Date();

        let nombre = 'Admin-01'
            console.log(loginService.getAllUsers())
            try{
                nombre = loginService.getAllUsers().user_name
            }
            catch{
                nombre = 'INTRUSO'
            }

        e.preventDefault()
        if (validate() && checkQueue() && checkQueueMail() && checkQueueRel()){            // 
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
                register_by:nombre, 
                edad: parseInt(values.edad, 10),
                lat:parseFloat((getRandomArbitrary(342417, 345648)/100000).toFixed(9)),
                long:parseFloat((getRandomArbitrary(-7651282, -7649471)/100000).toFixed(9)),
                id_profesional:values.id_profesional,
                num_habitantes:parseInt(values.num_habitantes,10),
                ciudad_contagio:values.ciudad_contagio
            })
            datos.push(numeros)
            datos.push(mail)
            datos.push(pariente)
            console.log(datos)
            //patientService.insertPatient(values)
            resetForm()        
            goBack()    
        }
    }
*/
    

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
                        <Controls.Select
                        name="id_profesional"
                        label="Professional ID"
                        value={values.id_profesional}
                        onChange={handleInputChange}
                        options={profesional}
                        error={errors.id_profesional}
                        /> 
                        <Controls.Select
                        name="ciudad_contagio"
                        label="Place of contagion"
                        value={values.ciudad_contagio}
                        onChange={handleInputChange}
                        options={ciudades}
                        error={errors.ciudad_contagio}
                        />                      
                </Grid>   
                
                <Grid container>
                    <Grid item xs={6}>
                    <h1  className={classes.title}>Add number</h1>
                        <Controls.Input
                            name="numero"
                            label="Numero"
                            value={values.numero}
                            onChange={handleInputChange}
                            error={errors.numero}
                        />
                        <Controls.Button
                                text="Add number"
                                onClick={addNumber}/>     
                        
                    </Grid>                
                    <Grid item xs={6}>
                    <h1  className={classes.title}>Add mail</h1>
                        <Controls.Input
                            name="email"
                            label="E-mail"
                            value={values.email}
                            onChange={handleInputChange}
                            error={errors.email}
                        />
                        <Controls.Button
                                text="Add email"
                                onClick={addMail} />                           
                    </Grid>
                </Grid>

                <Grid container className={classes.visuallyHidden}>
                <h1  className={classes.title}>Add relative</h1>
                <Grid item xs={12}>
                    <Controls.Input
                        name="nombre_completo"
                        label="Name"
                        value={values.nombre_completo}
                        onChange={handleInputChange}
                        error={errors.nombre_completo}
                    />
                    <Controls.Input
                        name="id_pariente"
                        label="Identification Number"
                        value={values.id_pariente}
                        onChange={handleInputChange}
                        error={errors.id_pariente}
                    />
                    <Controls.RadioGroup
                        name="tipo_idP"
                        label="Type ID"
                        value={values.tipo_idP}
                        onChange={handleInputChange}
                        items={tipo_idItems}
                    />
                    <Controls.Select
                        name="id_parentesco"
                        label="Relationship"
                        value={values.id_parentesco}
                        onChange={handleInputChange}
                        options={parentesco}
                        error={errors.id_parentesco}
                    />  
                    
               </Grid>  
               <Controls.Button
                            text="Add relative"
                            onClick={addPariente} />     
                            </Grid>      
            </Grid>
            <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={eraseAll}/>
                    </div>
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