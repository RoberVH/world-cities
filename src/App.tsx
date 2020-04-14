/* eslint-disable no-sequences */
import React, {useState} from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import './App.css';
import { CityWeather, RequestInputData, User } from './config/types'; //, CityValues
import LoginHolder from './components/LoginHolder';
import { DisplayWeatherData } from './components/DespliegaDatoClima';
import ChangeLanguage from './components/ChangeLanguage';
import CityInput from './components/Cityinput';
import userHooksForm  from './utils/userHookForms'; 
import { getAXIOSCiudades } from './utils/network';
import { checkAuth } from './config/firebase';



const  App:React.FC= (props) => {

 const { t } = useTranslation();
 const [weatherReport,setweatherReport]= useState <CityWeather | undefined>(undefined);
 const [notCityFound,setNoCityFound] = useState(false)
// const userProv: User={username:'', logged:false};

 //const [user, setUser]= useState<User>(userProv);
 console.log('setting user undefined ---------')
 const [user, setUser]= useState<User|undefined>(undefined);
 
 checkAuth();
 
  const displayNoCityMsg = (notFound: boolean)  => {
      if (notFound)  return <p>{t("main.notfound")}</p>
         else return  <p>{t("main.selectcity")}</p>
        }
      
      
  const requestDataWeather = async ():Promise<void> => {
    setUser ({username:'Roberto Viqua', logged:true})
    try { 
      setNoCityFound(false);
      console.log('Param de entrada: ',inputReturnValues.values.city ,inputReturnValues.values.country?.value)
      setweatherReport(undefined);
      const listaCiudades = await getAXIOSCiudades(inputReturnValues.values.city , inputReturnValues.values.country?.value);
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
          console.log('¡Error buscando ciudades!',error.message, '\n error.response es:', error.response, '\n error.response.status',
                error.response.status, '\n error.response.headers',error.response.headers,
                '\n error.response.data.message',error.response.data.message)
        }
      }
    }
  
    
  const inputReturnValues:RequestInputData = userHooksForm(requestDataWeather);
// provisional
    
    console.log(user)
  
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

//export default App;
export default withTranslation('translate')(App);
