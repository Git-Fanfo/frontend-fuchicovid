import React, { useCallback } from 'react'
import EmployeeForm from "./LobbyRegForm";
import PageHeader from "../../components/PageHeader";
import HomeIcon from '@material-ui/icons/Home';
import { Paper,makeStyles } from '@material-ui/core';
import * as loginService from "../../services/loginService";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        paddingBottom: '6%',
    }
}))

export default function LobbyReg() {

    const history = useHistory();
    const goToHornyJail = useCallback(() => history.push('/login'), [history]);

    const classes = useStyles();
    //const nombre = loginService.getAllUsers().userName
    //imprimirUsuario();
    let nombre = ''
    console.log(loginService.getAllUsers())

    nombre = loginService.getAllUsers().privilege
    
    if(nombre == 'High')
    nombre = 'service worker'

    if(nombre == 'Medium')
    nombre = 'doctor'

    if(nombre == undefined)
    goToHornyJail()

    return (
        <>
            <PageHeader
                title={"Welcome again "+ nombre}
                subTitle="Service Worker Panel"
                icon={<HomeIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <EmployeeForm />
            </Paper>
        </>
    )
}
