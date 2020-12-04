import React from 'react'
import NewEntryReg from "./NewEntryForm";
import PageHeader from "../../components/PageHeader";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function NewEntry() {

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="New entry"
                subTitle="Fill all the blanks"
                icon={<LocalHospitalIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <NewEntryReg />
            </Paper>
        </>
    )
}
