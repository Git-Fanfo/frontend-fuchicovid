import React from 'react'
import VisitForm from "./VisitsTable";
import PageHeader from "../../components/PageHeader";
import TableChartIcon from '@material-ui/icons/TableChart';
import { Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Visits() {

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Number of doctor's visits"
                subTitle="View the data in a table"
                icon={<TableChartIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <VisitForm />
            </Paper>
        </>
    )
}
