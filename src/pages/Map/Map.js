import React, {useCallback, useState, useEffect} from 'react'
import PageHeader from "../../components/PageHeader";
import TableChartIcon from '@material-ui/icons/TableChart';
import { Paper,makeStyles } from '@material-ui/core';
import MapView from "../../components/Maps/MapView"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }, 
    button : {
        marginBottom :  theme.spacing(3),

    }
}))

export default function Employees() {
    const history = useHistory();
    const goBack = useCallback(() => history.push('/lobby-service'), [history]);
    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Cali infected map"
                subTitle="Pacients spreaded out"
                icon={<TableChartIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<ArrowBackIcon />}
                        onClick={goBack}
                >BACK
                </Button>
                <MapView></MapView>
            </Paper>
            
        </>
    )
}
