
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