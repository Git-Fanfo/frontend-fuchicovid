import React from 'react'
import EmployeeForm from "./LobbyRegForm";
import PageHeader from "../../components/PageHeader";
import HomeIcon from '@material-ui/icons/Home';
import { Paper,makeStyles } from '@material-ui/core';
import * as loginService from "../../services/loginService";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        paddingBottom: '6%',
    }
}))

export default function LobbyReg() {

    const classes = useStyles();
    //const nombre = loginService.getAllUsers()[0].username
    //const imprimirUsuario = () => console.log(loginService.getAllUsers()[0].username)
    //imprimirUsuario();
    return (
        <>
            <PageHeader
                title={"Welcome Again "}
                subTitle="Service Worker Panel"
                icon={<HomeIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <EmployeeForm />
            </Paper>
        </>
    )
}
