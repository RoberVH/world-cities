/**
 * clima.js  - All related to weather data
 * 
 */
import React from 'react'
import { ClimaCiudad, clima } from './config/types';


export const DespliegaDatosClima =(props:ClimaCiudad): JSX.Element => {
    try { 
      console.log('Props en DespliegaDatosClima', props)
    return (
       <div> 
          <h2>{props.name}</h2> 
          
          <ul>
            {/* <DetailClima weather={datos.weather}/> */}
            {Object.entries(props.main).map((value) =>  <li key= {value[0]}> {value[0].toString()} : {value[1].toString()}</li>)} 
          </ul>
      </div>  );
    } catch (e) {
      console.log('Errorsote',e);
      return (<div></div>)
    }
  }
  