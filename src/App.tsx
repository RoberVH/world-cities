/* eslint-disable no-sequences */
import React, {useState} from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import {REACT_APP_OPENWEATHERMAP_APIKEY} from './config/globals';
//import  {coordenadas, clima, principal, viento, sistema} from  './config/types';
import { ClimaCiudad, clima } from './config/types';
import { promises } from 'dns';


const APIURL= 'http://api.openweathermap.org/data/2.5/weather/';
//&units=metric&lang=es
//const getAXIOSCiudades = (param: string) => axios.get(`${APIURL}?q=${param}&units=metric&lang=es&appid=${REACT_APP_OPENWEATHERMAP_APIKEY}`);
const getAXIOSCiudades:(ciudad: string) => Promise<AxiosResponse<any>> = (ciudad) => axios.get(
         `${APIURL}?q=${ciudad}&units=metric&lang=es&appid=${REACT_APP_OPENWEATHERMAP_APIKEY}`);





//const  App:React.FC= () => {
  function   App ()  {

   

  const [reporteClima,setReporte]=useState <ClimaCiudad | undefined>(undefined);
 
  //const [reporteClima,setReporte]=useState({datos:{} as ClimaCiudad});
  console.log('reporteClima inicializado:',typeof reporteClima)
  
  const buscarCiudades = async (e: any):Promise<void> => {
    try {
      const listaCiudades = await getAXIOSCiudades('Mérida');
      setReporte(listaCiudades.data);
      console.log('listaCiudades', listaCiudades.data);
      console.log('reporteClima asignado', reporteClima);
      let nue= reporteClima as ClimaCiudad;
      console.log(nue)
      } catch (error) { 
        if ( error.response ) {
        console.log('¡Error!',error.message, '\n error.response es:', error.response, '\n error.response.status',
                error.response.status, '\n error.response.headers',error.response.headers,
                '\n error.response.data.message',error.response.data.message)
        }
      }
    }

// const DetailClima = ({weather}:clima) => {
//   return Object.entries(props.weather).map(hecho =>  <p> {hecho[0].toString()}: {hecho[1].toString()}</p>)
  
// }

  
    //HTMLElement 
// const DespliegaDatosClima =(datos:ClimaCiudad): JSX.Element => {
  const DespliegaDatosClima =(props:any): JSX.Element => {
  try { 
    console.log(props)
    
  return (
    
    <div> 
        <h2>{props.children.name}</h2> 
        
      <ul>
{/* <DetailClima weather={datos.weather}/> */}
{/* {Object.entries(datos.weather).map(hecho =>  <p> {hecho[0].toString()}: {hecho[1].toString()}</p>)} */}
 {Object.entries(props.children.weather).map((key,value) =>  <p> {key.toString()} : {value.toString()}</p>)} 

      </ul>
    </div>  );
  } catch (e) {
    console.log('Errorsote',e);
    return (<div></div>)
  }

}

 
  return (
    <div className="App">
      <div>
         <button onClick={buscarCiudades}>Buscar Ciudades</button>
      </div>
      <hr></hr>
      <div>
          <DespliegaDatosClima> {reporteClima} </DespliegaDatosClima>
      {/* {reporteClima ? DespliegaDatosClima (reporteClima) : { {name:'que pintar'}} } */}
      </div>
  
    </div>
  );
}

export default App;
