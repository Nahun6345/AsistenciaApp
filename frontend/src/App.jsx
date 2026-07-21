import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Marcaje from "./pages/Marcaje";
import Empleados from "./pages/Empleados";
import Reportes from "./pages/Reportes";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";


import "./App.css";



function App(){


return(


<BrowserRouter>


<Routes>



<Route

path="/login"

element={<Login/>}

/>





<Route

path="/"

element={

<PrivateRoute>

    <Layout/>

</PrivateRoute>

}

>


<Route

index

element={<Dashboard/>}

/>



<Route

path="marcaje"

element={<Marcaje/>}

/>



<Route

path="empleados"

element={<Empleados/>}

/>



<Route

path="reportes"

element={<Reportes/>}

/>



</Route>



</Routes>


</BrowserRouter>


);


}


export default App;