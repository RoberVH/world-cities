/**
 * network.ts   All API & requests sent over internet to affect data
 */

import axios, { AxiosResponse } from 'axios';
import {REACT_APP_OPENWEATHERMAP_APIKEY} from './config/globals';

const APIURL= 'http://api.openweathermap.org/data/2.5/weather/';


export const getAXIOSCiudades:(ciudad: string) => Promise<AxiosResponse<any>> = (ciudad) => axios.get(
         `${APIURL}?q=${ciudad}&units=metric&lang=es&appid=${REACT_APP_OPENWEATHERMAP_APIKEY}`);