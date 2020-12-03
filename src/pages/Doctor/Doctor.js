import React from 'react'
import EmployeeForm from "./DoctorForm";
import PageHeader from "../../components/PageHeader";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Doctors() {

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Register a Doctor"
                subTitle="Fill all the blanks"
                icon={<LocalHospitalIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <EmployeeForm />
            </Paper>
        </>
    )
}
