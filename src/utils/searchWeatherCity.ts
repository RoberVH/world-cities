/**
 *  searchWeatherCity .- Invoke API to get weather data for the city from OpenWeatherApi 
 */

import React from 'react';
//import { getAXIOSCiudades }  from '../utils/network';

const searchWeatherCity = async (e:  React.MouseEvent<HTMLButtonElement>):Promise<void> => {
    e.preventDefault();
    try {
      /*const listaCiudades = await getAXIOSCiudades(cityName);
      setReporte(listaCiudades.data);
      console.log('listaCiudades del API', listaCiudades.data);
      console.log('reporteClima asignado a Objecto', reporteClima);
    */ } catch (error) { 
        if ( error.response ) {
        console.log('¡Error buscando ciudades!',error.message, '\n error.response es:', error.response, '\n error.response.status',
                error.response.status, '\n error.response.headers',error.response.headers,
                '\n error.response.data.message',error.response.data.message)
        }
      }
    }

    export default searchWeatherCity;