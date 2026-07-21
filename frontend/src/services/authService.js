import api from "./api";


export const login = async(email,password)=>{


    const respuesta = await api.post(

        "/Auth/login",

        {
            email,
            password
        }

    );


    return respuesta.data;


};