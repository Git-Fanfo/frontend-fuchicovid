const KEYS ={
    login:'login',
    loginId:'loginId'
}

export const getLogin = ()=>([
    { id: '1', username: 'admin', password: 'admin' },
    { id: '2', username: 'administrador', password: 'SoyAdmin' },
])

export function insertLog(data) {
    console.log(data)
    let login=getAllUsers();
    data['id'] = generateloginId()
    login.push(data)
    localStorage.setItem(KEYS.login,JSON.stringify(login))
}

export function generateloginId() {
    if (localStorage.getItem(KEYS.loginId) == null)
        localStorage.setItem(KEYS.loginId, '0')
    var id = parseInt(localStorage.getItem(KEYS.loginId))
    localStorage.setItem(KEYS.loginId, (++id).toString())
    return id;
}

export function getAllUsers() {
    if (localStorage.getItem(KEYS.login) == null)
        localStorage.setItem(KEYS.login, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.login));
}