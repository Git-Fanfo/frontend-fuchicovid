import React from 'react'
import EmployeeForm from "./ConsultRelFormTable";
import PageHeader from "../../components/PageHeader";
import TableChartIcon from '@material-ui/icons/TableChart';
import { Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Age() {

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Age of patients"
                subTitle="View the data in a table"
                icon={<TableChartIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <EmployeeForm />
            </Paper>
        </>
    )
}
