import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/employeeService";


const type_idItems = [
    { id: 'c.c.', title: 'C.C.' },
    { id: 'c.e.', title: 'C.E.' },
    { id: 't.i.', title: 'T.I.' },
]

const initialFValues = {
    id: 0,
    name: '',
    last_name: '',
    college: '',
    id_Number: '',
    address: '',
    type_id: 'C.C.',
    neighborhoodId: '',
    eps: '',
    //Si queremos poner calendario al final, poner new Date aqui
    registerDate: '',
    //isPermanent: false,
    hour : ''
}

export default function EmployeeForm() {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        /*
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('college' in fieldValues)
            temp.college = (/$^|.+@.+..+/).test(fieldValues.college) ? "" : "college is not valid."
        if ('id_Number' in fieldValues)
            temp.id_Number = fieldValues.id_Number.length > 9 ? "" : "Minimum 10 numbers required."
        if ('neighborhoodId' in fieldValues)
            temp.neighborhoodId = fieldValues.neighborhoodId.length != 0 ? "" : "This field is required."        
        */
        
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

    const handleSubmit = e => {
        let today = new Date();
        e.preventDefault()
        if (validate()){            
            let fecha = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let hora = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            values.registerDate = fecha;
            values.hour = hora;
            employeeService.insertEmployee(values)
            resetForm()            
        }
        //console.log(employeeService.getAllEmployees())
    }

    return (
        <Form onSubmit={handleSubmit}>
            
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        name="last_name"
                        label="Last Name"
                        value={values.last_name}
                        onChange={handleInputChange}
                        error={errors.last_name}
                    />
                    <Controls.RadioGroup
                        name="type_id"
                        label="Type ID"
                        value={values.type_id}
                        onChange={handleInputChange}
                        items={type_idItems}
                    />
                    
                    <Controls.Input                    
                        name="id_Number"
                        label="Identification Number"
                        value={values.id_Number}
                        onChange={handleInputChange}
                        error={errors.id_Number}
                    />                  

                </Grid>
                <Grid item xs={6}>
                    <Controls.Input                            
                            name="address"
                            label="Address"
                            value={values.address}
                            onChange={handleInputChange}
                            error={errors.address}
                        />
                    <Controls.Select
                        name="neighborhoodId"
                        label="Neighborhood"
                        value={values.neighborhoodId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.neighborhoodId}
                    />
                    <Controls.Input
                            name="college"
                            label="College"
                            value={values.college}
                            onChange={handleInputChange}
                            error={errors.college}
                        />                    
                    <Controls.Select
                        name="eps"
                        label="EPS"
                        value={values.eps}
                        onChange={handleInputChange}
                        options={employeeService.getEPS()}
                        error={errors.eps}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm}/>
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}

/*

                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />


<Controls.DatePicker
                        name="registerDate"
                        label="Register Date"
                        value={values.registerDate}
                        onChange={handleInputChange}
                    />

*/