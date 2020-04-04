/**
 * clima.js  - All functions related to weather data
 * 
 */
import React, { Suspense } from 'react'
import { CityWeather,principal } from './config/types';  //,   



export const DespliegaDatosClima =(props:CityWeather, t:any): JSX.Element => {
  
  try { 
      console.log('Props en DespliegaDatosClima', props)
      
    return (
      <Suspense fallback="loading">
       <div>
          <h2>{props.name} - {props.sys.country} </h2> 
          <ul style={{listStyleType:'none'}}>
              {ParseMainData(props.main,t)}
          </ul>
          
      </div>  
      </Suspense>
      );
    } catch (e) {
      console.log('Errorsote',e);
      return (<div></div>)
    }
  }
  
  
    const ParseMainData = (datos: principal,t:any) : JSX.Element[] => {
      const dataPrincipal:Array<JSX.Element> =[]; 
      let i=0;
      dataPrincipal.push(<li key= {i++} >{t("weather.temp")}: {datos.temp} {t("weather.degrees")}</li> )
      dataPrincipal.push(<li key= {i++} >{t("weather.feelslike")}: {datos.feels_like} {t("weather.degrees")}</li> )
      dataPrincipal.push(<li key= {i++} >{t("weather.maxtemp")}: {datos.temp_max} {t("weather.degrees")}</li> )
      dataPrincipal.push(<li key= {i++} >{t("weather.mintemp")}: {datos.temp_min} {t("weather.degrees")}</li> )
      dataPrincipal.push(<li key= {i++} >{t("weather.humidity")}: {datos.humidity}</li> )
      dataPrincipal.push(<li key= {i++} >{t("weather.pressure")}: {datos.pressure}</li> )
      return dataPrincipal;
  }