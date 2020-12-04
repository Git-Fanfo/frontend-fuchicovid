import React, {useCallback,useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import * as apiGetService from "../../services/apiGetService";
import * as loginService from "../../services/loginService";
import { Grid, } from '@material-ui/core';
import { useForm, Form } from '../../components/useForm';
import Controls from "../../components/controls/Controls";
import Snackbar from '@material-ui/core/Snackbar';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';


//////
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const tipo_idItems = [
  { id: 'c.c.', title: 'C.C' },
  { id: 'c.e.', title: 'C.E' },
  { id: 't.i.', title: 'T.I' },
]
const initialFValues = {
  nombre: '',
  tipo_id: '',
}
/////
function createData(nombre, numero, email) {
  return { nombre, numero, email};
}

let rows = [
  createData('juanito','1234','aaaaaaaaa')
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'nombre', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'numero', numeric: false, disablePadding: false, label: 'Number' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  //////////
  const history = useHistory();
  const redirect = useCallback(() => history.push('/lobby-service'), [history]);

  const [open, setOpen] = React.useState(false);

  const showAlert = () => {
    setOpen(true);
  };

  const hideAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors }        
    //console.log(fieldValues.userName)
    //console.log(loginService.getLogin())
    if ('nombre' in fieldValues)
        temp.nombre = fieldValues.nombre ? "" : "Please enter a valid username."
    if ('tipo_id' in fieldValues)
        temp.tipo_id = fieldValues.tipo_id ? "" : "Please enter a valid password." 
    //Aqui revisa si existe el usuario  
    let ans = loginService.getLogin()//esto es un array
   
    setErrors({
        ...temp
    })

    if (fieldValues == values)
        return Object.values(temp).every(x => x == "")
}

const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
} = useForm(initialFValues, true, validate);

const   handleSubmit = async e => {
    
    e.preventDefault()
    if (validate()){
        try {          
            let config = {
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(values)
            }
            //console.log(config.body)
            let res = await fetch('https://shrouded-bastion-95914.herokuapp.com/api/login', config)
            let json = await res.json()

            if(json.length===0){
                showAlert()                   
            }else{                    
                loginService.insertLog(json[0])
                resetForm()  
                redirect()                            
            }                               
        } catch (error) {
            //this.props.history.push('/')
            console.log('ohno :o')
            //console.log(error)                
        }
    //console.log(this.state)
    }
}
////////

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('numberofpatients');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  //const history = useHistory();
  const goBack = useCallback(() => history.push('/lobby-service'), [history]);

  const [avg,setAvg] = useState([])

  useEffect(() => {
      async function fetchData() {
        setAvg(await apiGetService.getAvgAge())
      }
      fetchData();
    }, []); 
  //HERE
  //  rows = avg

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.age);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
<Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<ArrowBackIcon />}
                onClick={goBack}
      >BACK
      </Button>
<Form onSubmit={handleSubmit}>
            <Grid container justify="center">
                <Grid item xs={6}>
                    <Controls.Input
                        name="nombre"
                        label="Nombre"
                        value={values.nombre}
                        onChange={handleInputChange}
                        error={errors.nombre}
                    />
                    <Controls.Input
                        name="tipo_id"
                        label="tipo_id"
                        value={values.tipo_id}
                        onChange={handleInputChange}
                        error={errors.tipo_id}
                    />              

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Login"                        
                             />
                        <Snackbar open={open} autoHideDuration={5000} onClose={hideAlert}>
                            <Alert onClose={hideAlert} severity="error">
                            User not found
                            </Alert>
                        </Snackbar>
                    </div>
                </Grid>
                
            </Grid>
        </Form>
      
      <Paper className={classes.paper}>
      
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.nombre);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.nombre)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.nombre}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.nombre}
                      </TableCell>
                      <TableCell align="left">{row.numero}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
