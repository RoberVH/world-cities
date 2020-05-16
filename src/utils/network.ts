/**
 * network.ts   All API & requests sent over internet to query / affect data
 */
 
import axios, { AxiosResponse } from 'axios';
import { CityWeather, WebCamObjects } from '../config/types';
import { getAPIKEY } from '../config/firebase';
import { TFunction } from 'i18next';
import { coordenadas } from '../config/types';
import il8n from '../config/i18n'; 





export const getAXIOSCiudades =(apiurl: string, apikey: string, city: string, country?:string) : Promise<AxiosResponse> | undefined => {
    const undefinedValue =typeof undefined;
    const countryName = (typeof country === undefinedValue || country === '') ? '': `,${country}`;
    const cityName= (typeof city === undefinedValue )? '': `,${city}`;
    if (cityName !== '') {
        const currentLang=il8n.language;
        const openWeatherUrl = `${apiurl}?q=${city}${countryName}&units=metric&lang=${currentLang}&appid=${apikey}`;
        return axios.get(openWeatherUrl);
    } else {
        return undefined;
    }
}

export const getAXIOSWebCams= (apiurl: string, apikey: string,coords:coordenadas): Promise<AxiosResponse> | undefined => {
    // Expect coords are not undefined or null
    // Build url request
    const currentLang=il8n.language;
    //console.log('Lenguaje: ', currentLang);
    const WINDY_API_BODY= 'api/webcams/v2/list/';
    const baseUrl= apiurl + WINDY_API_BODY;
    const cityCoord= `nearby=${coords.lat},${coords.lon},40`;
    const windyUrl= baseUrl + cityCoord + `/limit=10?lang=${currentLang}&show=webcams:image,location,player`;
    const getUrlwitApiKey = windyUrl;
    console.log('getUrlwitApiKey',getUrlwitApiKey);
    return axios.get(getUrlwitApiKey, {
                        headers:{ 'x-windy-key': apikey } 
                        }
                    );
}

/**
 * requestCityDataWeather - Request data for city from Open Weather free, public API
 * @param setweatherReport 
 * @param t 
 * @param cityName 
 * @param country 
 */
export const requestCityDataWeather = 
       async (setweatherReport:React.Dispatch<React.SetStateAction<CityWeather | undefined>>, 
              t:TFunction, cityName: string, country: string|undefined):Promise<void> => {
    
    const OPENWEATHER_API_NAME_FIELD= 'OpenWeather';  // DB name of OpenWeather (Weather data) API collection 
   
    // Due to SelectReact return value of {label,value} can be undefined we better check for undefined value to pass down later
    const undefinedValue =typeof undefined;
    const countryName = (typeof country === undefinedValue || country === '') ? '': `,${country}`;
   
    try { 
        // get OPENWATHER API key from firebase DB Cloud Firestore
        const resultsOpenWeatherAPIKey= await getAPIKEY(OPENWEATHER_API_NAME_FIELD);
        if (!resultsOpenWeatherAPIKey ) {
            alert(`${t("error.noresponsefromodatabase")}`);
            return
        }
        const apiKey=resultsOpenWeatherAPIKey.key;
        const apiUrl= resultsOpenWeatherAPIKey.url;
        setweatherReport(undefined);  // Preemptyvely Set state to No city
        const cityData = await getAXIOSCiudades(apiUrl, apiKey, cityName , countryName);
        if (cityData) {
           // console.log('Setting cityData', cityData.data)
            setweatherReport(cityData.data);
        }
        } catch (error) { 
          if (error.response.status !== '404')
              {
                alert(`${t("errors.citynotfound")}`);
              } else {
                    alert(`--Error: ${error.response.data.message}`);
                    console.log('¡Error buscando ciudades!',error.message, '\n error.response es:', error.response, '\n error.response.status',
                          error.response.status, '\n error.response.headers',error.response.headers,
                          '\n error.response.data.message',error.response.data.message)
             }
    }
  }

/**
 * requestCityWebCams - Get a list of title/thumbnail/link  to daily footage of WebCam from free, public Windy.com API
 * @param coords 
 * @param setlistWebCAM 
 */
  export const requestCityWebCams = 
    async (coords:coordenadas,
            setlistWebCAM: React.Dispatch<React.SetStateAction<WebCamObjects | undefined>>
          ):Promise<void> => {

    const WINDY_API_NAME_FIELD ="WindyApi";  // DB name of Windy API (WebCams data) collection  
    try { 
            // get Windy API key from firebase DB Cloud Firestore
            const resultsWindyAPIKey= await getAPIKEY(WINDY_API_NAME_FIELD);     
            if (!resultsWindyAPIKey ) {
                console.log('No hay respuesta de BD FireBase');
                return 
            }
            const apiKey= resultsWindyAPIKey.key;
            const apiUrl= resultsWindyAPIKey.url;
            setlistWebCAM(undefined);  // Preemptyvely Set state to No Web Cameras
            const cityWebCamList = await getAXIOSWebCams(apiUrl, apiKey,coords);
            // console.log('1 Lista WebCams',cityWebCamList)
            // console.log('2 Lista WebCams',cityWebCamList?.data)
            console.log('3 Lista WebCams',cityWebCamList?.data.result)

            if (cityWebCamList && cityWebCamList.data.status==='OK') {
                console.log('Setting cityData', cityWebCamList.data)
                if (cityWebCamList.data.result.total > 0) {
                        setlistWebCAM(cityWebCamList.data.result.webcams)
                    } else {
                        console.log('No huubo camaras', cityWebCamList.data)
                    }
            } else {
                console.log('Sin resultados')
            }
        } catch (error) {  
            console.log('Error loco:',error)
          if (error && error.response && error.response.status) 
                if (error.response.status=== '404') {
                    alert(error);   
              } else {
                    alert(`Error: ${error}`);
                    console.log('¡Error buscando ciudades!',error.message, '\n error.response es:', error.response, '\n error.response.status',
                          error.response.status, '\n error.response.headers',error.response.headers,
                          '\n error.response.data.message',error.response.data.message)
             }
             return undefined
    }
  }
