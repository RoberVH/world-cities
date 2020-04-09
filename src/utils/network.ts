/**
 * network.ts   All API & requests sent over internet to affect data
 */
 
import axios, { AxiosResponse } from 'axios';
import {REACT_APP_OPENWEATHERMAP_APIKEY} from '../config/globals';
 
const APIURL= 'http://api.openweathermap.org/data/2.5/weather/';

//export const getAXIOSCiudades:(ciudad: string, country?:string) => Promise<AxiosResponse<Array<any>>> = (city,country) =>{
export const getAXIOSCiudades =(city: string, country?:string) : Promise<AxiosResponse> | undefined => {
    const undefinedValue =typeof undefined;
    const countryName = (typeof country === undefinedValue || country === '')? '': `,${country}`;
    const cityName= (typeof city === undefinedValue )? '': `,${city}`;
    if (cityName !== '') {
        console.log(`${APIURL}?q=${city}${countryName}&units=metric&lang=es&appid=${REACT_APP_OPENWEATHERMAP_APIKEY}`)
        return axios.get(`${APIURL}?q=${city}${countryName}&units=metric&lang=es&appid=${REACT_APP_OPENWEATHERMAP_APIKEY}`);
    } else {
        return undefined;
    }
}
