/**
 * Visiting Cities - App to show current weather conditions and web cams of cities of the world
 * author: Roberto Vicuña
 */

/* eslint-disable no-sequences */
import React, {useState, useEffect} from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/headercomponent';
import { CityWeather, RequestInputData, User, WebCamObjects } from './config/types'; 
import { DisplayWeatherData } from './components/DisplayWeatherData';
import userHooksForm  from './utils/userHookForms'; 
import { requestCityDataWeather, requestCityWebCams} from './utils/network';
import { getSessionUser, removeSessionUser } from './utils/useMaintainSession';
import { listenerAuthState, SignOutUser } from './config/firebase';
import { DisplayWebCams } from './components/DisplayCamarasWeb';

 

const  App:React.FC= (props) => {

 // State is maintained  with useState hook, user var is passed through to modules as this App is small*********************************************************
 // Also, browser session is used to persist user logged through refreshes and reopening of browser
 const { t } = useTranslation();
 const [user, setUser]= useState<User|undefined>(getSessionUser());   // check to see if there is valid session on localstorage, if there is, load user
 const [cityDataWeatherReport, setcityDataWeatherReport]= useState <CityWeather | undefined>(undefined);
 const [listaWebCam, setlistWebCAM] = useState<WebCamObjects | undefined>(undefined);

 
   
/* RequestCityData - It call all functions to get data from city, it pass state set functions so
*                    it canretireve data passed to components that display it 
*/
const requestCytyData = (): void => { 
   requestCityDataWeather(setcityDataWeatherReport,t, inputReturnValues.values.city, inputReturnValues.values.country?.value)
  }
  

  //  Assign a variable to contain input and callbacks  from userHooksForm 
  const inputReturnValues:RequestInputData = userHooksForm(requestCytyData);
  
  useEffect(()=> {
    return () => {
      console.log('Saliendo y apagando listener');
      SignOutUser()
      setUser(undefined)
      removeSessionUser();
      listenerAuthState();
      alert('Saliendo');
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]
  )

//Get and set list Cameras when there's new city chosen
  useEffect(()=> {

    if (cityDataWeatherReport && cityDataWeatherReport.coord) {
      requestCityWebCams(cityDataWeatherReport!.coord, setlistWebCAM); 
  } else {
    setlistWebCAM(undefined);
  }

  },[cityDataWeatherReport]
  )  
  
  
  return (
  <div>
    <Header 
      user={user}
      setUser={setUser}
      inputReturnValues={inputReturnValues}
      labelColor={"#ffffff"}
    />
    { 
     typeof cityDataWeatherReport !== 'undefined' ? 
     <div className="frame-title">
        <div className=  "frame-cards">
             {DisplayWeatherData(cityDataWeatherReport,t)} 
       </div>
      </div>
       : null
        }

      <div>
        { 
          typeof cityDataWeatherReport !== 'undefined' ?
              listaWebCam ? DisplayWebCams (listaWebCam, t) 
                 : <div  className=  "web-cameras-pending">
                      <label>{t('camera.nowebcameras')}</label>
                 </div>
              : null
           }
      </div>
  </div>   
  );
}
export default withTranslation('translate')(App);
