import { json } from 'react-router-dom'
import {URLAzure} from '../../../../config/config'

export function GetHistoryUser(user,fechai,fechaf,sede,dniUser,token) {
    const data = {
        userName: user,
        fechaInicio: fechai,
        fechaFin: fechaf,
        sedeUser: sede,
        dniUser: dniUser,
        tipoUsuario: null,
        rucUser: null
    }
    const options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }
    return fetch(`${URLAzure}/api/v01/ct/sistemaArchivos/detalleListadoHistorialPacientesConFiltros`,options)
    .then(res => res.json()).then(response => response) 
}

