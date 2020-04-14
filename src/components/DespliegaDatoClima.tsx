/**
 * clima.js  - Display Component of all data  related to weather data and the values retrieve from API OpenWeather
 * 
 */
import React, { Suspense } from 'react'
import { CityWeather } from '../config/types';  //,   
import moment from 'moment';




export const DisplayWeatherData =(props:CityWeather, t:any): JSX.Element => {
 // const rightnow= moment();
  const timepo= (props.dt);
  console.log('Segun moment ',timepo,moment.unix( timepo).toDate())
  
  try { 
      //console.log('Props en DisplayWeatherData', props)
    return (
      <Suspense fallback="loading">
       <div>
         
          <h3>{props.name} - {props.sys.country} </h3>
          <h3>{t("weather.userlocaltime")}: {convertUnixDate(props.dt,true)}</h3>
          <img alt='' src= {`http://openweathermap.org/img/wn/${props.weather[0].icon}.png`}></img>
          <ul style={{listStyleType:'none'}}>
              {ParseMainData(props,t)}
          </ul>
          
      </div>  
      </Suspense>
      ); 
    } catch (e) {
      console.log('Error',e);
      return (<div></div>)
    }
  }
  
  
    const ParseMainData = (props: CityWeather, t:any) : JSX.Element[] => {
      const dataPrincipal:Array<JSX.Element> =[]; 
      let i=0;
      dataPrincipal.push(<li key= {i++} >{t("weather.temp")}: {props.main.temp}° {t("weather.degrees")}</li> )
      dataPrincipal.push(<li key= {i++} >{t("weather.feelslike")}: {props.main.feels_like}° {t("weather.degrees")}</li> )
      dataPrincipal.push(<li key= {i++} >{t("weather.humidity")}: {props.main.humidity}%</li> )
      dataPrincipal.push(<li key= {i++} >{t("weather.pressure")}: {props.main.pressure} hPa</li> )
      dataPrincipal.push(<li key= {i++} >{t("weather.sunrise")}: {convertUnixDate(props.sys.sunrise, false)}</li> )
      dataPrincipal.push(<li key= {i++} >{t("weather.sunset")}: {convertUnixDate(props.sys.sunset, false)}</li> )
      dataPrincipal.push(<li key= {i++} >{t("weather.main")}: {props.weather[0].main}</li> )
      dataPrincipal.push(<li key= {i++} >{t("weather.description")}: {props.weather[0].description}</li> )

      return dataPrincipal;
  }

  const convertUnixDate= (unixTimeStamp: number, fullFormat:boolean): string => {
    if (fullFormat ) return moment.unix(unixTimeStamp).format('YYYY-MM-DD h:mm a');
       else return moment.unix(unixTimeStamp).format('h:mm a');
  }

  
