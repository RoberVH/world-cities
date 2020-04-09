/* eslint-disable no-sequences */
import React, {useState} from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import './App.css';

//import  {coordenadas, clima, principal, viento, sistema} from  './config/';
import { CityWeather, RequestInputData } from './config/types'; //, CityValues
import { DisplayWeatherData } from './components/DespliegaDatoClima';
import ChangeLanguage from './components/ChangeLanguage';
import CityInput from './components/Cityinput';
//import DisplaySession from './components/DisplaySession'
import userHooksForm  from './utils/userHookForms'; 
import { getAXIOSCiudades } from './utils/network';
//import userSession from './utils/useMaintainSession';
//import {userSessionKey} from './config/globals';


const  App:React.FC= (props) => {

 const { t } = useTranslation();
 
  const displayNoCityMsg = (notFound: boolean)  => {
      if (notFound)  return <p>{t("main.notfound")}</p>
         else return  <p>{t("main.selectcity")}</p>
  }


  const requestDataWeather = async ():Promise<void> => {
    try {
      setNoCityFound(false);
      console.log('Param de entrada: ',inputReturnValues.values.city ,inputReturnValues.values.country?.value)
      setweatherReport(undefined);
      const listaCiudades = await getAXIOSCiudades(inputReturnValues.values.city , inputReturnValues.values.country?.value);
      if (listaCiudades) {
        setweatherReport(listaCiudades.data);
        console.log('listaCiudades del API', listaCiudades.data);
        console.log('weatherReport asignado a Objecto', weatherReport);
      } else {
        console.log('No hubo resultados');
        setNoCityFound(true);
 
      }
      } catch (error) { 
        if ( error.response ) {
          setNoCityFound(true)
          console.log('¡Error buscando ciudades!',error.message, '\n error.response es:', error.response, '\n error.response.status',
                error.response.status, '\n error.response.headers',error.response.headers,
                '\n error.response.data.message',error.response.data.message)
        }
      }
    }
  
  const inputReturnValues:RequestInputData = userHooksForm(requestDataWeather);
  const [weatherReport,setweatherReport]= useState <CityWeather | undefined>(undefined);
  const [notCityFound,setNoCityFound] = useState(false)
  
  return (
    <div className="App">
      <div>{t("main.banner")}</div>
      <div>
      <ChangeLanguage/>
      </div>
      <div>
        <CityInput 
          values= {inputReturnValues.values}
          handleSubmit= {inputReturnValues.handleSubmit}
          handleChange= {inputReturnValues.handleChange} 
          handleSelectChange= {inputReturnValues.handleSelectChange} 
        />
      </div>
      <hr></hr>
      <div>
        {/*  <DisplayWeatherData> {weatherReport} </DisplayWeatherData>*/}
     {typeof weatherReport !== 'undefined' ? DisplayWeatherData (weatherReport,t) : displayNoCityMsg(notCityFound)} 
      </div>
    </div>
  );
}

//export default App;
export default withTranslation('translate')(App);
