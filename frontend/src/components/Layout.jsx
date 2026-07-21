import { Link, Outlet, useNavigate } from "react-router-dom";

import {
    FaHome,
    FaUsers,
    FaClipboardList,
    FaUserClock,
    FaSignOutAlt
} from "react-icons/fa";


function Layout(){


    const navigate = useNavigate();



    const cerrarSesion = ()=>{


        localStorage.removeItem("usuario");


        navigate("/login");


    };



    return (


        <div className="app">


            <aside className="sidebar">


                <h2>
                    🕒 Asistencia
                </h2>



                <div className="perfil">


                    <img 
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="usuario"
                    />


                    <h3>
                        Administrador
                    </h3>


                </div>





                <nav>



                    <Link to="/">
                        <FaHome/> 
                        Dashboard
                    </Link>



                    <Link to="/marcaje">
                        <FaUserClock/> 
                        Marcaje
                    </Link>



                    <Link to="/empleados">
                        <FaUsers/> 
                        Empleados
                    </Link>



                    <Link to="/reportes">
                        <FaClipboardList/> 
                        Reportes
                    </Link>




                    <button
                    className="btn-cerrar"
                    onClick={cerrarSesion}
                    >

                        <FaSignOutAlt/>

                        Cerrar sesión

                    </button>



                </nav>



            </aside>





            <main className="contenido">

                <Outlet/>

            </main>





        </div>


    );


}


export default Layout;