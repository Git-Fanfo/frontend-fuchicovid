import React, { useState } from 'react';
import './App.css';
import SideMenu from "../components/SideMenu";
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from "../components/Header";
import PageHeader from '../components/PageHeader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Employees from "../pages/Employees/Employees";

import Login from "../pages/Login/Login"
import LoginProps from "../pages/LoginProps/Login"
import LobbyRegistro from "../pages/LobbyRegistro/LobbyReg"
import Patients from "../pages/Patient/Patient"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      //default: "#f4f5fd"
      default: "#ffb0c4"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    //paddingLeft: '320px',
    paddingLeft: '0px',
    width: '100%'
  }
})

function App() {

  //setView(state.login+1);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      {/*<SideMenu />
      <Header />
      <Login/>
        <Employees />*/}
      <div className={classes.appMain}>
        
        
      </div>

      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginProps}/>
          <Route path="/lobby-service" component={LobbyRegistro}/>
          <Route path="/register-doctor" component={Employees}/>
          <Route path="/patient-register" component={Patients}/>
          <Route component={LoginProps}/>
        </Switch>
      </BrowserRouter>

      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
