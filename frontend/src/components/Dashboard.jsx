import { useEffect, useState } from "react";
import { obtenerDashboard } from "../services/dashboardService";


function Dashboard(){


    const [data,setData] = useState(null);
    const [error,setError] = useState("");



    const cargar = async()=>{

        try{

            const respuesta = await obtenerDashboard();

            setData(respuesta);
            setError("");

        }
        catch(error){

            console.log(error);
            setError("Error conectando con servidor");

        }

    };



    useEffect(()=>{


        cargar();


        // Actualizar cada 5 segundos
        const intervalo = setInterval(()=>{

            cargar();

        },5000);



        return ()=> clearInterval(intervalo);


    },[]);



    if(error)
        return <h2>{error}</h2>;



    if(!data)
        return <h2>Cargando...</h2>;



    return(

        <div>


            <h1>
                📊 Dashboard Asistencia
            </h1>



            <div className="cards">


                <div>
                    👥 Empleados
                    <h2>
                        {data.totalEmpleados}
                    </h2>
                </div>



                <div>
                    📌 Marcajes
                    <h2>
                        {data.totalMarcajes}
                    </h2>
                </div>



                <div>
                    🟢 Entradas
                    <h2>
                        {data.entradas}
                    </h2>
                </div>



                <div>
                    🔴 Salidas
                    <h2>
                        {data.salidas}
                    </h2>
                </div>


            </div>





            <h2>
                📋 Asistencia del día
            </h2>



            <table>


                <thead>

                    <tr>

                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Cargo</th>
                        <th>Entrada</th>
                        <th>Salida</th>
                        <th>Estado</th>

                    </tr>


                </thead>



                <tbody>


                {
                    data.asistencias.map((a,index)=>(


                    <tr key={index}>


                        <td>
                            {a.codigo}
                        </td>



                        <td>
                            {a.nombre}
                        </td>



                        <td>
                            {a.cargo}
                        </td>



                        <td>

                            {
                            new Date(a.entrada)
                            .toLocaleTimeString()
                            }

                        </td>



                        <td>

                            {

                            a.salida

                            ?

                            new Date(a.salida)
                            .toLocaleTimeString()

                            :

                            "Pendiente"

                            }

                        </td>



                        <td>


                            {
                                a.salida

                                ?

                                <span style={{color:"red"}}>
                                    🔴 Salida
                                </span>

                                :

                                <span style={{color:"green"}}>
                                    🟢 Entrada
                                </span>
                            }


                        </td>



                    </tr>


                    ))
                }



                </tbody>


            </table>


        </div>


    );


}


export default Dashboard;