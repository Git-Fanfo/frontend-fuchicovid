
export const getBarrio = async ()=>{
    try {
        //console.log(config.body)
        let res = await fetch('https://shrouded-bastion-95914.herokuapp.com/api/getBarrio')
        let json = await res.json()
        return json                               
    } catch (error) {
        //this.props.history.push('/')
        return []
        //console.log(error)                
    }
}

export const getCiudad = async ()=>{
    try {
        //console.log(config.body)
        let res = await fetch('https://shrouded-bastion-95914.herokuapp.com/api/getCiudad')
        let json = await res.json()
        return json                               
    } catch (error) {
        //this.props.history.push('/')
        return []
        //console.log(error)                
    }
}

export const getParentesco = async ()=>{
    try {
        //console.log(config.body)
        let res = await fetch('https://shrouded-bastion-95914.herokuapp.com/api/getParentesco')
        let json = await res.json()
        return json                               
    } catch (error) {
        //this.props.history.push('/')
        return []
        //console.log(error)                
    }
}

export const getProfesional = async ()=>{
    try {
        //console.log(config.body)
        let res = await fetch('https://shrouded-bastion-95914.herokuapp.com/api/getProfesional')
        let json = await res.json()
        return json                               
    } catch (error) {
        //this.props.history.push('/')
        return []
        //console.log(error)                
    }
}