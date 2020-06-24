/**
 * DisplayWeatherData.tsx  - Display Component of all data  related to weather data and the values retrieve from API OpenWeather
 * 
 */
import React, { Suspense } from 'react'
import { CityWeather } from '../config/types';  //,   
import moment from 'moment';
import { TFunction } from 'i18next';
import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';


export const DisplayWeatherData =(props:CityWeather, t:TFunction): JSX.Element => {
   const localTime = (props.dt);
  
  try { 
    return (
      <Suspense fallback="loading">
       <Card className="mt-1" style={{ color:'black', fontSize:'0.65rem', width:'100%'}}>
       <Card.Body> 
          <Card.Title className="mt-1 ml-2 mb-0" style={{ fontSize:'0.95rem'}} >
            {t("weather.weatherheader")}       
            {`${props.name} - ${props.sys.country}`}

            </Card.Title>
   
              <img alt='' src= {`http://openweathermap.org/img/wn/${props.weather[0].icon}.png`}></img>
              {ParseMainData(props,t)}
          </Card.Body>
          <Card.Footer>
              {t("weather.userlocaltime")}: {convertUnixDate(localTime,true)}
          </Card.Footer>
       </Card>           
       </Suspense>
      ); 
    } catch (e) {
      console.log('Error',e);
      return (<div></div>)
    }
  }
  
  
  const ParseMainData = (props: CityWeather, t:any) : JSX.Element[] => {
//      const ParseMainData = (props: CityWeather, t:any) : JSX.Element => {
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

  
