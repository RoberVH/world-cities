/* eslint-disable no-sequences */
import React, {useState, useEffect} from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";


import { CityWeather, RequestInputData, User, WebCamObjects } from './config/types'; //, CityValues
import LoginHolder from './components/LoginHolder';
import { DisplayWeatherData } from './components/DisplayWeatherData';
import ChangeLanguage from './components/ChangeLanguage';
import CityInput from './components/Cityinput';
import userHooksForm  from './utils/userHookForms'; 
import { requestCityDataWeather, requestCityWebCams} from './utils/network';
import { getSessionUser, removeSessionUser } from './utils/useMaintainSession';
import { listenerAuthState, SignOutUser } from './config/firebase';
import { DisplayWebCams } from './components/DisplayCamarasWeb';
//import logo from '../src/data/imgs/citieslogo4.png';

 


const  App:React.FC= (props) => {

 // Initialization vars      *********************************************************
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
  

// memoization of getWebCam function requestCityWebCams

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//const getCityCams = useMemo (() => requestCityWebCams(cityDataWeatherReport!.coord, setlistWebCAM, t), [setlistWebCAM, t] );

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
      console.log('*******llamando a city web cams********')
      requestCityWebCams(cityDataWeatherReport!.coord, setlistWebCAM)
  }
  },[cityDataWeatherReport]
  ) 
  
  return (
    
  <div>
    <Navbar>  
     <Container fluid>
      <Row> 
        <Col md={4}> 
          <Navbar.Brand >
            <span className="brand-logo">Visiting&nbsp;</span>
            <span className="brand-logo highcolor">Cities</span>
          </Navbar.Brand>
        </Col>
        <Col  md={8}>
          <Nav>   
            <LoginHolder 
              user={user} 
              setUser={setUser}/>
          </Nav>   
        </Col> 
        <Col md={8}>        
          <Nav>   
            <ChangeLanguage/>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Nav>   
            <CityInput 
              values= {inputReturnValues.values}
              handleSubmit= {inputReturnValues.handleSubmit}
              handleChange= {inputReturnValues.handleChange} 
              handleSelectChange= {inputReturnValues.handleSelectChange} 
            />
        </Nav>   
      </Row>
     </Container>
    </Navbar>
      <hr></hr>
      <div>
          {typeof cityDataWeatherReport !== 'undefined' ? DisplayWeatherData(cityDataWeatherReport,t) : <label>{t("main.selectcity")}</label>} 
      </div>
      <div>
        <div>
          { listaWebCam ? DisplayWebCams (listaWebCam) :  <label>{t('camera.nowebcameras')}</label>}           
        </div>
      </div>
    </div> 
  );
}
export default withTranslation('translate')(App);
