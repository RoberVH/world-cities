/* eslint-disable no-sequences */
import React, {useState, useEffect} from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import './App.css';
import { CityWeather, RequestInputData, User } from './config/types'; //, CityValues
import LoginHolder from './components/LoginHolder';
import { DisplayWeatherData } from './components/DespliegaDatoClima';
import ChangeLanguage from './components/ChangeLanguage';
import CityInput from './components/Cityinput';
import userHooksForm  from './utils/userHookForms'; 
import { getAXIOSCiudades } from './utils/network';
import { getSessionUser, removeSessionUser } from './utils/useMaintainSession';
import { listenerAuthState, SignOutUser, getAPIKEY } from './config/firebase';

 
const OPENWEATHER_API_NAME_FIELD= 'OpenWeather';  // DB bame of API

const  App:React.FC= (props) => {

 // Initialization vars      *********************************************************
  const { t } = useTranslation();
 const [weatherReport,setweatherReport]= useState <CityWeather | undefined>(undefined);
 const [notCityFound,setNoCityFound] = useState(false);
 //const [user, setUser]= useState<User|undefined>(undefined)

 const [user, setUser]= useState<User|undefined>(getSessionUser());   // check to see if there is valid session on localstorage, if there is, load user
 
 // Module private functions  *********************************************************
 const displayNoCityMsg = (notFound: boolean)  => {
      if (notFound)  return <p>{t("main.notfound")}</p>
         else return  <p>{t("main.selectcity")}</p>
        }      

  
const requestDataWeather = async ():Promise<void> => {
    try { 
      // get OPENWATHER API key from firebase DB Cloud Firestore
      const resultsAPIKey= await getAPIKEY(OPENWEATHER_API_NAME_FIELD);
      if (!resultsAPIKey) {
          alert(`${t("error.noresponsefromodatabase")}`);
          return
      }
      console.log('sali del get api key con: resultsAPIKey.t:',resultsAPIKey.t)
      if (!resultsAPIKey) throw new Error(t("errors.noopenweatherapi"));
      console.log('resultsAPIKey.t.docs',resultsAPIKey);
      const apiKey=resultsAPIKey.key;
      const apiUrl= resultsAPIKey.url;
      setNoCityFound(false);
      console.log('Param de entrada: ',inputReturnValues.values.city ,inputReturnValues.values.country?.value)
      setweatherReport(undefined);
      const listaCiudades = await getAXIOSCiudades(apiUrl, apiKey, inputReturnValues.values.city , inputReturnValues.values.country?.value);
      if (listaCiudades) {
          setweatherReport(listaCiudades.data);
          console.log('listaCiudades del API', listaCiudades.data);
      } else {
          console.log('No hubo resultados');
          setNoCityFound(true);
       }
      } catch (error) { 
        if ( error.response ) {
          setNoCityFound(true)
          alert(`${t("errors.failedopenweathercall")}:  ${error.message}`);
          console.log('¡Error buscando ciudades!',error.message, '\n error.response es:', error.response, '\n error.response.status',
                error.response.status, '\n error.response.headers',error.response.headers,
                '\n error.response.data.message',error.response.data.message)
        } else {
          alert(error);
        }
      }
    }

  //  Assign a variable to contain input and callbacks  from userHooksForm 
  const inputReturnValues:RequestInputData = userHooksForm(requestDataWeather);

  useEffect(()=> {
    return () => {
      console.log('Saliendo y apagando listener');
      for (let i=0; i<= 999999999;i++);
      //  if (auth && auth.currentUser && !auth.currentUser?.displayName) { 
      SignOutUser()
      setUser(undefined)
      removeSessionUser();
      listenerAuthState();
      alert('Saliendo')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]
  )
  
  return (
    <div className="App">
      <div>{t("main.banner")}</div>
      <div>  
        <LoginHolder 
          user={user} 
          setUser={setUser}/>
        <ChangeLanguage/>
      </div>
      <hr></hr>
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
          {typeof weatherReport !== 'undefined' ? DisplayWeatherData (weatherReport,t) : displayNoCityMsg(notCityFound)} 
      </div>
    </div>
  );
}
export default withTranslation('translate')(App);
