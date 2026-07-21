import api from "./api";


export const obtenerDashboard = async()=>{

    const respuesta = await api.get(
        "/Dashboard"
    );

    return respuesta.data;

};