const KEYS ={
    employees:'employees',
    employeeId:'employeeId'
}

export const getDepartmentCollection = ()=>([
    { id: '1', title: 'Colseguros' },
    { id: '2', title: 'Gran Limonar' },
    { id: '3', title: 'Barrio Alejandro' },
    { id: '4', title: 'Barrio Nicolas' },
])

export const getEPS = ()=>([
    { id: '300', title: 'SOS' },
    { id: '301', title: 'SURA' },
    { id: '302', title: 'Coomeva' },
    { id: '303', title: 'Muerte grati' },
])

export function insertEmployee(data) {
    /*
    let employees=getAllEmployees();
    data['id'] = generateEmployeeId()
    employees.push(data)
    */console.log(data)
    
    localStorage.setItem(KEYS.employees,JSON.stringify(data))
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId, (++id).toString())
    return id;
}

export function getAllEmployees() {
    if (localStorage.getItem(KEYS.employees) == null)
        localStorage.setItem(KEYS.employees, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.employees));
}