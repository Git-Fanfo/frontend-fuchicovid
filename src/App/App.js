import React from 'react';
import './App.css';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Doctors from "../pages/Doctor/Doctor";
import LoginProps from "../pages/LoginProps/Login"
import LobbyRegistro from "../pages/LobbyRegistro/LobbyReg"
import Patients from "../pages/Patient/Patient"
import Map from "../pages/Map/Map"
import Average from "../pages/T. Average per neighborhood/Average"
import Age from "../pages/T. Age of patients/Age"
import Visits from "../pages/T. Number of doctor visits/Visits"
import Inventory from "../pages/T. Inventory/Inventory"
import NewEntry from "../pages/New Entry/NewEntry"
import ConsultRelatives from "../pages/T. ConsultRelative/ConsultRel"

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
          <Route path="/inventory-table" component={Inventory}/>
          <Route path="/new-entry" component={NewEntry}/>
          <Route path="/consult-relatives" component={ConsultRelatives}/>                   
          <Route component={LoginProps}/>
        </Switch>
      </BrowserRouter>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
