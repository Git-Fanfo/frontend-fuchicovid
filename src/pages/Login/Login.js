import React from 'react'
import LoginForm from "./LoginForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/Android';
import { Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        paddingLeft: '10%',
    }
}))

export default function Login(props) {

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="FUCHICOVID"
                subTitle="Professional registration"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <LoginForm />
            </Paper>
        </>
    )
}
