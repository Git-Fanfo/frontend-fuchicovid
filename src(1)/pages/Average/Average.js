import React from 'react'
import EmployeeForm from "./AverageTable";
import PageHeader from "../../components/PageHeader";
import TableChartIcon from '@material-ui/icons/TableChart';
import { Paper,makeStyles } from '@material-ui/core';
import MapView from "../../components/Maps/MapView"

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Employees() {

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Average by Neighborhood"
                subTitle="View the data in a table"
                icon={<TableChartIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <EmployeeForm />
                <MapView></MapView>
            </Paper>
            
        </>
    )
}
