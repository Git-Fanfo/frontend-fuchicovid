import React, { useState } from 'react'
import PatientForm from "./PatientForm";
import PageHeader from "../../components/PageHeader";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Patients() {
    
    const classes = useStyles();

    return (
        <>
            
            <PageHeader
                title="Register a Patient"
                subTitle="Complete the form"
                icon={<LocalHospitalIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <PatientForm/>
            </Paper>
        </>
    )
}
