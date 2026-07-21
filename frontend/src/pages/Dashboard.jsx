import {useEffect,useState} from "react";
import {obtenerDashboard} from "../services/dashboardService";


function Dashboard(){


const [data,setData]=useState(null);



useEffect(()=>{

cargar();

},[]);



const cargar=async()=>{

const respuesta=await obtenerDashboard();

setData(respuesta);

};



if(!data)
return <h2>Cargando...</h2>;



return(

<div>


<h1>
📊 Dashboard Asistencia
</h1>



<div className="cards">


<div className="card">
👥 Empleados
<h2>{data.totalEmpleados}</h2>
</div>


<div className="card">
📌 Marcajes
<h2>{data.totalMarcajes}</h2>
</div>


<div className="card">
🟢 Entradas
<h2>{data.entradas}</h2>
</div>


<div className="card">
🔴 Salidas
<h2>{data.salidas}</h2>
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


<td>{a.codigo}</td>

<td>{a.nombre}</td>

<td>{a.cargo}</td>


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
{a.estado}
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