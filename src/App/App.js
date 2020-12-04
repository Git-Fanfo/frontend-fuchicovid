import React from 'react';
//import React, { useState } from 'react';
import './App.css';
//import SideMenu from "../components/SideMenu";
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
//import Header from "../components/Header";
//import PageHeader from '../components/PageHeader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Doctors from "../pages/Doctor/Doctor";
import LoginProps from "../pages/LoginProps/Login"
import LobbyRegistro from "../pages/LobbyRegistro/LobbyReg"
import Patients from "../pages/Patient/Patient"
import Map from "../pages/Map/Map"
import MapView from "../components/Maps/MapView"
import Average from "../pages/T. Average per neighborhood/Average"
import Age from "../pages/T. Age of patients/Age"
import Visits from "../pages/T. Number of doctor visits/Visits"
import NewEntry from "../pages/New Entry/NewEntry"

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
        <Employees />
        <Route path="/map" component={MapView}/>*/}
      <div className={classes.appMain}>
        
        
      </div>

      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginProps}/>
          <Route path="/lobby-service" component={LobbyRegistro}/>
          <Route path="/register-doctor" component={Doctors}/>
          <Route path="/patient-register" component={Patients}/>
          <Route path="/map" component={Map}/>
          <Route path="/average-table" component={Average}/>
          <Route path="/age-table" component={Age}/>
          <Route path="/visits-table" component={Visits}/>
          <Route path="/new-entry" component={NewEntry}/>
          
          <Route component={LoginProps}/>
        </Switch>
      </BrowserRouter>

      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
