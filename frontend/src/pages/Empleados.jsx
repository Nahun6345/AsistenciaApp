import Swal from "sweetalert2";
import { useEffect, useState } from "react";

import {
    obtenerEmpleados,
    crearEmpleado
} from "../services/empleadoService";



function Empleados(){



    const cargos = [

        "Supervisor",
        "Operario",
        "Digitador",
        "Kitiador",
        "Montacarguista",
        "Sorteador",
        "Sorteadora",
        "Asistente"

    ];





    const [empleados,setEmpleados] = useState([]);





    const [form,setForm] = useState({

        codigo:"",
        nombre:"",
        telefono:"",
        cargo:"",
        activo:true

    });







    const cargar = async()=>{


        try{


            const data = await obtenerEmpleados();


            setEmpleados(data);



        }
        catch(error){


            Swal.fire({

                icon:"error",

                title:"Error",

                text:"No se pudieron cargar los empleados."

            });


        }


    };








    useEffect(()=>{


        cargar();


    },[]);










    const guardar = async()=>{


        if(
            !form.codigo ||
            !form.nombre ||
            !form.cargo
        ){



            Swal.fire({

                icon:"warning",

                title:"Datos incompletos",

                text:
                "Debe ingresar Código, Nombre y seleccionar un Cargo.",

                confirmButtonText:"Aceptar",

                confirmButtonColor:"#2563eb"

            });



            return;


        }








        try{


            await crearEmpleado(form);




            Swal.fire({

                icon:"success",

                title:"Empleado registrado",

                text:
                `${form.nombre} fue agregado correctamente.`,

                timer:2000,

                showConfirmButton:false

            });






            setForm({

                codigo:"",
                nombre:"",
                telefono:"",
                cargo:"",
                activo:true

            });






            cargar();




        }
        catch(error){



            Swal.fire({

                icon:"error",

                title:"Error al guardar",

                text:
                "No se pudo registrar el empleado.",

                confirmButtonColor:"#dc2626"

            });



        }




    };









    return(



<div>



<h1>
👥 Empleados
</h1>






<div className="formulario">






<input

placeholder="Código empleado"

value={form.codigo}

onChange={
e=>setForm({

    ...form,

    codigo:e.target.value

})
}

/>







<input

placeholder="Nombre completo"

value={form.nombre}

onChange={
e=>setForm({

    ...form,

    nombre:e.target.value

})
}

/>







<input

placeholder="Teléfono"

value={form.telefono}

onChange={
e=>setForm({

    ...form,

    telefono:e.target.value

})
}

/>








<select

value={form.cargo}

onChange={
e=>setForm({

    ...form,

    cargo:e.target.value

})
}

>


<option value="">
Seleccione cargo
</option>



{
    cargos.map((cargo,index)=>(


        <option

        key={index}

        value={cargo}

        >

            {cargo}

        </option>


    ))
}



</select>







<button
onClick={guardar}
>

💾 Guardar empleado

</button>






</div>









<div className="tabla-container">



<h2>
Lista de empleados
</h2>





<table>



<thead>


<tr>


<th>
Código
</th>


<th>
Nombre
</th>


<th>
Teléfono
</th>


<th>
Cargo
</th>


<th>
Estado
</th>


</tr>


</thead>








<tbody>




{

empleados.map(e=>(



<tr key={e.id}>



<td>
{e.codigo}
</td>




<td>
{e.nombre}
</td>




<td>

{
e.telefono
?
e.telefono
:
"Sin teléfono"
}

</td>




<td>
{e.cargo}
</td>






<td>


<span

className={

e.activo

?

"estado activo"

:

"estado inactivo"

}

>


{

e.activo

?

"Activo"

:

"Inactivo"

}



</span>


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



export default Empleados;