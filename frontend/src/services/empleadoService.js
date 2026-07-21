import api from "./api";


export const obtenerEmpleados = async()=>{

    const respuesta = await api.get("/Empleados");

    return respuesta.data;

};



export const crearEmpleado = async(empleado)=>{

    const respuesta = await api.post(
        "/Empleados",
        empleado
    );

    return respuesta.data;

};