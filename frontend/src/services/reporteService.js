import api from "./api";


// Obtener reporte
export const obtenerReporte = async(inicio, fin)=>{


    const respuesta = await api.get(
        "/Reportes",
        {
            params:{
                inicio,
                fin
            }
        }
    );


    return respuesta.data;

};




// Exportar Excel
export const exportarExcel = async(inicio, fin)=>{


    const respuesta = await api.get(

        "/Reportes/Excel",

        {
            params:{
                inicio,
                fin
            },

            responseType:"blob"

        }

    );



    const url = window.URL.createObjectURL(
        new Blob([respuesta.data])
    );



    const link = document.createElement("a");


    link.href=url;


    link.download=
    `Reporte_Asistencia_${inicio}.xlsx`;



    document.body.appendChild(link);


    link.click();


    link.remove();


};