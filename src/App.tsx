/* eslint-disable no-sequences */
import React, {useState} from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import './App.css';

//import  {coordenadas, clima, principal, viento, sistema} from  './config/';
import { CityWeather, RequestInputData } from './config/types'; //, CityValues
import { DespliegaDatosClima } from "./clima";
import CityInput from './components/cityinput';
import userHooksForm  from './utils/userHookForms'; 
import { getAXIOSCiudades } from './utils/network'




const  App:React.FC= (props) => {

  const { t } = useTranslation();

  const despliegaNoCity = (notFound: boolean)  => {
      if (notFound)  return <p>{t("main.notfound")}</p>
         else return  <p>{t("main.selectcity")}</p>
  }

 // const requestDataWeather = async (e:  React.MouseEvent<HTMLButtonElement>):Promise<void> => {
   // e.preventDefault();
   const requestDataWeather = async ():Promise<void> => {
    try {
      setNoCityFound(false);
      const cityName= inputReturnValues.values.city;
      const countryName= inputReturnValues.values.country;
      console.log('cityName,countryName',cityName,countryName);
      setReporte(undefined);
     
      
      const listaCiudades = await getAXIOSCiudades(cityName,countryName);
      if (listaCiudades) {
        setReporte(listaCiudades.data);
        console.log('listaCiudades del API', listaCiudades.data);
        console.log('reporteClima asignado a Objecto', reporteClima);
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
  
  //const { values, handleChange, handleSubmit }:RequestInputData = userHooksForm(requestDataWeather);
  const inputReturnValues:RequestInputData = userHooksForm(requestDataWeather);
  
  const [reporteClima,setReporte]= useState <CityWeather | undefined>(undefined);
  const [notCityFound,setNoCityFound] = useState(false)

  //const [{cityName, countryName},setInputDataCity]= useState(''); // < CityRequested| undefined>(undefined);
  //const [countryName,setCountry]= useState(''); // < CityRequested| undefined>(undefined);
  
  
  console.log('function App -> reporteClima inicializado:',typeof reporteClima)
  

 
  return (
    <div className="App">
      <div>{t("main.banner")}</div>
      <div>
        <CityInput 
          values= {inputReturnValues.values}
          handleSubmit= {inputReturnValues.handleSubmit}
          handleChange= {inputReturnValues.handleChange} 
        />
      </div>
      <hr></hr>
      <div>
        {/*  <DespliegaDatosClima> {reporteClima} </DespliegaDatosClima>*/}
     {typeof reporteClima !== 'undefined' ? DespliegaDatosClima (reporteClima) : despliegaNoCity(notCityFound)} 
      </div>
  
    </div>
  );
}

//export default App;
export default withTranslation('translate')(App);
