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

export const getDepartmentCollection = ()=>([
    { id: '1', title: 'Limonar' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
])

const initialFValues = {
    id: 0,
    name: '',
    last_name: '',
    email: '',
    mobile: '',
    address: '',
    type_id: 'c.c.',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
}

export default function EmployeeForm() {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        /*
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."        
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
        e.preventDefault()
        if (validate()){
            employeeService.insertEmployee(values)
            resetForm()            
        }
        console.log(employeeService.getAllEmployees())
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
                        name="mobile"
                        label="Identification Number"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />                  

                </Grid>
                <Grid item xs={6}>
                    <Controls.Input                            
                            name="address"
                            label="Address"
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    <Controls.Input
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            error={errors.email}
                        />
                    <Controls.Select
                        name="departmentId"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={getDepartmentCollection()}
                        error={errors.departmentId}
                    />
                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
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