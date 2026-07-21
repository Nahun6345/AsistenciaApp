import { useState } from "react";

import {
    obtenerReporte,
    exportarExcel
} from "../services/reporteService";


function Reportes(){


    const [inicio,setInicio] = useState("");

    const [fin,setFin] = useState("");

    const [datos,setDatos] = useState([]);



    const buscar = async()=>{


        if(!inicio || !fin){

            alert("Seleccione las fechas");

            return;

        }


        const respuesta = await obtenerReportes(
            inicio,
            fin
        );


        setDatos(respuesta);


    };





    const descargarExcel = async()=>{


        if(!inicio || !fin){

            alert("Seleccione las fechas");

            return;

        }


        await exportarExcel(
            inicio,
            fin
        );


    };





return(

<div>


<h1>
📅 Reporte de Asistencia
</h1>




<div className="filtros">



<label>
Desde:
</label>


<input

type="date"

value={inicio}

onChange={
e=>setInicio(e.target.value)
}

/>




<label>
Hasta:
</label>


<input

type="date"

value={fin}

onChange={
e=>setFin(e.target.value)
}

/>




<button onClick={buscar}>

🔍 Buscar

</button>



<button 
onClick={descargarExcel}
>

📥 Exportar Excel

</button>



</div>






<div className="tabla-container">


<table>


<thead>

<tr>

<th>Código</th>

<th>Nombre</th>

<th>Cargo</th>

<th>Fecha</th>

<th>Entrada</th>

<th>Salida</th>

<th>Estado</th>


</tr>


</thead>




<tbody>


{

datos.map((r,index)=>(


<tr key={index}>


<td>
{r.codigo}
</td>


<td>
{r.nombre}
</td>


<td>
{r.cargo}
</td>


<td>
{
new Date(r.fecha)
.toLocaleDateString()
}
</td>



<td>

{
r.entrada
?
new Date(r.entrada)
.toLocaleTimeString()
:
"-"
}

</td>



<td>

{
r.salida
?
new Date(r.salida)
.toLocaleTimeString()
:
"Pendiente"
}

</td>



<td>
{r.estado}
</td>



</tr>


))


}


</tbody>



</table>


</div>




</div>


);


}


export default Reportes;