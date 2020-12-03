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

    const imprimirUsuario = () => console.log(loginService.getAllUsers())

    const [buttonRegDoc,setbuttonRegDoc] = useState(<Controls.Button
                                                type="submit"
                                                text="Register a Doctor"
                                                fullWidth={true}
                                                onClick={RegDoc}/>)
    const classes = useStyles();

    //Aqui lo de usuarios
    let test = true;

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
            <Grid container spacing={3}>                    
                    <Grid item xs={6}>
                    <Controls.Button
                                type="submit"
                                text="Register an Infected Patient"
                                fullWidth={true}
                                onClick={RegPac} />
                    </Grid>
                    <Grid item xs={6}>
                         {(test) ? buttonRegDoc : <div></div>}
                    </Grid>
                </Grid>
            
            <Grid container spacing={3}>
            
                    <Grid item xs={6}>
                    <h1  className={classes.title}>Record of visits</h1>
                    <Controls.Button
                                type="submit"
                                text="New entry"
                                fullWidth={true}
                                onClick={imprimirUsuario}/>         
                    </Grid>
                    <Grid item xs={6}>
                    <h1  className={classes.title}>Contact Info.</h1>
                    <Controls.Button
                                type="submit"
                                text="See additional information"
                                color="secondary"
                                fullWidth={true}/>         
                    </Grid>
            </Grid>
            <h1  className={classes.title}>Reports</h1>
            <Grid container spacing={3}>
                    <Grid item xs={4}>
                    <Controls.Button
                                type="submit"
                                text="Average Infected per neighborhood"
                                fullWidth={true}/>         
                    </Grid>
                    <Grid item xs={4}>
                    <Controls.Button
                                type="submit"
                                text="Age of the Pacients"
                                fullWidth={true} />
                    </Grid>
                    <Grid item xs={4}>
                    <Controls.Button
                                type="submit"
                                text="Visit Count"
                                fullWidth={true} />
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