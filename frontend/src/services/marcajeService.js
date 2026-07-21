import api from "./api";


export const marcarEmpleado = async(codigo)=>{

    const respuesta = await api.post(
        "/Marcaje",
        {
            codigo: codigo
        }
    );


    return respuesta.data;

};