import { URLAzure } from "../../../../config/config";

export function ListSedesxUsername(id_user, token) {
    console.log(id_user)
    const url = `${URLAzure}/api/v01/ct/usuarioSede/listadoPorBusquedaIDUSER/${id_user}`
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return fetch(url,options).then(res => res.json()).then(response => response) 
        
}

