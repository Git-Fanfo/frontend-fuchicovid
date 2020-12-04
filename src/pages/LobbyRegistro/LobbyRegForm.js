import React, { useState, useEffect, useCallback } from 'react'
import { Grid, makeStyles, IconButton, Badge, Button } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Controls from "../../components/controls/Controls";
import {useHistory} from 'react-router-dom';
import * as loginService from "../../services/loginService";

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: '2.5em',
        color: '#282c34',
        //textAlign: 'center',
        paddingBottom: '0.7em',
        paddingTop: '1em',
    }
}))

export default function LobbyRegForm() {

    const history = useHistory();
    const goBack = useCallback(() => history.push('/login'), [history]);
    const RegDoc = useCallback(() => history.push('/register-doctor'), [history]);
    const RegPac = useCallback(() => history.push('/patient-register'), [history]); 
    const TabAvg = useCallback(() => history.push('/average-table'), [history]); 
    const TabAge = useCallback(() => history.push('/age-table'), [history]); 
    const TabVst = useCallback(() => history.push('/visits-table'), [history]); 
    const TabInv = useCallback(() => history.push('/inventory-table'), [history]); 
    const NewEnt = useCallback(() => history.push('/new-entry'), [history]);
    const ConRel = useCallback(() => history.push('/consult-relatives'), [history]);
    const map = useCallback(() => history.push('/map'), [history]); 
    const goToHornyJail = useCallback(() => history.push('/login'), [history]);

    let test = false;
    let nombre = ''
    console.log(loginService.getAllUsers())

    nombre = loginService.getAllUsers().privilege
    
    if(nombre == 'High')
    test = true

    if(nombre == 'Medium')
    test = false

    if(nombre == undefined)
    goToHornyJail()

    const imprimirUsuario = () => console.log(loginService.getAllUsers())
    const [register, setRegister] = useState(<Grid container spacing={3}>                    
        <Grid item xs={6}>
        <Controls.Button
                    type="submit"
                    text="Register an Infected Patient"
                    fullWidth={true}
                    onClick={RegPac} />
        </Grid>
        <Grid item xs={6}>
        <Controls.Button
                    type="submit"
                    text="Register a Doctor"
                    fullWidth={true}
                    onClick={RegDoc}/>
        </Grid>
    </Grid>)

    const [entry,setEntry] = useState(<Controls.Button
                                    type="submit"
                                    text="New entry"
                                    fullWidth={true}
                                    onClick={NewEnt} />)
    
    const [contact, setContact] = useState(<Controls.Button
                                    type="submit"
                                    text="See additional information"
                                    color="secondary"
                                    fullWidth={true}
                                    onClick={ConRel} />)                                    
    const [inventory, setInventory] = useState(<Controls.Button
                                        type="submit"
                                        text="View Inventory"
                                        color="secondary"
                                        fullWidth={true}
                                        onClick={TabInv}/>)
                                    
    const classes = useStyles();

    //Aqui lo de usuarios
    //aqui -> {(test) ? buttonRegDoc : <div></div>}
    

    return (
        <React.Fragment>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<ArrowBackIcon />}
                onClick={goBack}
            >
                BACK
            </Button>
            <h1  className={classes.title}>Person Registration</h1>
            {(test) ? register : <p>Access denied</p>}
            
            <Grid container spacing={3}>
            
                    <Grid item xs={6}>
                    <h1  className={classes.title}>Record of visits</h1>                    
                        {(!test) ? entry : <p>Access denied</p>}
                    </Grid>
                    <Grid item xs={6}>
                    <h1  className={classes.title}>Contact Info.</h1>
                        {(!test) ? contact : <p>Access denied</p>}
                         
                    </Grid>
            </Grid>
            <h1  className={classes.title}>Reports</h1>
            <Grid container spacing={3}>
                    <Grid item xs={4}>
                    <Controls.Button
                                type="submit"
                                text="Average Infected per neighborhood"
                                fullWidth={true}
                                onClick={TabAvg}/>         
                    </Grid>
                    <Grid item xs={4}>
                    <Controls.Button
                                type="submit"
                                text="Age of the Pacients"
                                fullWidth={true}
                                onClick={TabAge} />
                    </Grid>
                    <Grid item xs={4}>
                    <Controls.Button
                                type="submit"
                                text="Visit Count"
                                fullWidth={true}
                                onClick={TabVst} />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>            
                    <Grid item xs={6}>
                    <h1  className={classes.title}>Stadistics</h1>                    
                        <Controls.Button
                                    type="submit"
                                    text="View map"
                                    fullWidth={true}
                                    onClick={map} />
                    </Grid>
                    <Grid item xs={6}>
                    <h1  className={classes.title}>Inventory.</h1>
                        {(!test) ? inventory : <p>Access denied</p>}                         
                    </Grid>
            </Grid>
            </React.Fragment>
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