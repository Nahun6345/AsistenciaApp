import {Link} from "react-router-dom";


function Sidebar(){

return(

<div className="sidebar">


<h3>
🕒 Asistencia
</h3>


<Link to="/">
<i className="bi bi-speedometer2"></i>
Dashboard
</Link>


<Link to="/marcaje">
<i className="bi bi-camera-fill"></i>
Marcaje
</Link>



<Link to="/empleados">
<i className="bi bi-people-fill"></i>
Empleados
</Link>



<Link to="/reportes">
<i className="bi bi-file-earmark-excel-fill"></i>
Reportes
</Link>



<Link to="/usuarios">
<i className="bi bi-person-fill-lock"></i>
Usuarios
</Link>


</div>

)

}


export default Sidebar;