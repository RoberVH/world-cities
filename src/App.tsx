/* eslint-disable no-sequences */
import React, {useState} from 'react';
import './App.css';
import { getAXIOSCiudades }  from './network';
//import  {coordenadas, clima, principal, viento, sistema} from  './config/types';
import { ClimaCiudad, clima } from './config/types';
import { DespliegaDatosClima } from "./clima";



const  App:React.FC= () => {

  const [reporteClima,setReporte]=useState <ClimaCiudad | undefined>(undefined);
 
  //const [reporteClima,setReporte]=useState({datos:{} as ClimaCiudad});
  console.log('function App -> reporteClima inicializado:',typeof reporteClima)
  
  const buscarCiudades = async (e: any):Promise<void> => {
    try {
      const listaCiudades = await getAXIOSCiudades('New York');
      setReporte(listaCiudades.data);
      console.log('listaCiudades del API', listaCiudades.data);
      console.log('reporteClima asignado a Objecto', reporteClima);
      } catch (error) { 
        if ( error.response ) {
        console.log('¡Error buscando ciudades!',error.message, '\n error.response es:', error.response, '\n error.response.status',
                error.response.status, '\n error.response.headers',error.response.headers,
                '\n error.response.data.message',error.response.data.message)
        }
      }
    }
 
  return (
    <div className="App">
      <div>
         <button onClick={buscarCiudades}>Buscar Ciudades</button>
      </div>
      <hr></hr>
      <div>
        {/*  <DespliegaDatosClima> {reporteClima} </DespliegaDatosClima>*/}
     {typeof reporteClima !== 'undefined' ? DespliegaDatosClima (reporteClima) : <h1>{'Seleccione una Ciudad'}</h1>} 
      </div>
  
    </div>
  );
}

export default App;
