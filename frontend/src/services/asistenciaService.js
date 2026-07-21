import api from "./api";


export const obtenerAsistencias = async()=>{

    const response = await api.get(
        "/Asistencias"
    );

    return response.data;

};