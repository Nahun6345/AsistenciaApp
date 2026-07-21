import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/authService";


function Login(){


    const [email,setEmail]=useState("");

    const [password,setPassword]=useState("");

    const [error,setError]=useState("");

    const navigate = useNavigate();



    const ingresar = async()=>{


        try{


            const usuario = await login(
                email,
                password
            );


            localStorage.setItem(
                "usuario",
                JSON.stringify(usuario)
            );


            navigate("/");


        }
        catch(error){


            setError(
                "Correo o contraseña incorrectos"
            );


        }


    };



return(


<div className="login-page">



    <div className="login-card">



        <div className="login-logo">

            🕒

        </div>



        <h1>
            Asistencia
        </h1>


        <p>
            Sistema de control de asistencia
        </p>




        <input

        type="email"

        placeholder="Correo electrónico"

        value={email}

        onChange={
            e=>setEmail(e.target.value)
        }

        />




        <input

        type="password"

        placeholder="Contraseña"

        value={password}

        onChange={
            e=>setPassword(e.target.value)
        }

        />




        <button
        onClick={ingresar}
        >

            Ingresar

        </button>



        {
            error &&
            <div className="error-login">

                {error}

            </div>
        }



    </div>



</div>


);


}


export default Login;