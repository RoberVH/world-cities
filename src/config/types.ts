import React from 'react';
import { ValueType, ActionMeta } from "react-select/src/types";
//import { ActionMeta, OptionProps, ValueType } from "react-select/src/types"; // tslint:disable-line no-submodule-imports
//setUser: React.Dispatch<React.SetStateAction<{username:string, logged:Boolean}>> 


// Authorization Provider Enumeration
// Having every provider element index match their corresponding string name  simplify when managing
// selection of icons and serialization / deserializatiobn  to browser sessin manager  at LoginHolder Component
export enum AuthorizationProvider {
  Google='Google',      
  Facebook='Facebook',
  Twitter='Twitter',
  Github='Github'
}

export type User = {
  username:string;
  logged:boolean;
  authProv?: AuthorizationProvider;
  weatherAPIKEY?: string;
  }


export type coordenadas = {
    lon: number;
    lat: number
  }
  
export type clima = {
    id: number;
    main: string;           // Group of weather parameters (Rain, Snow, Extreme etc.)
    description: string;    // Weather condition within the group.
    icon: string;
  }
  
export   type principal = {
    temp: number;
    feels_like: number;     // Temperature. This temperature parameter accounts for the human perception of weather
    temp_min: number;       // Minimum temperature at the moment. This is deviation from current temp that is possible for large
                            // cities and megalopolises geographically expanded
    temp_max: number;       // Maximum temperature at the momen (same as above)
    pressure: number;
    humidity: number;
  }
  
export   type viento = {
    speed: number;
    deg: number;
  }
  
export  type sistema = {
    country: string;
    name: string;
    sunrise: number;
    sunset: number;
  }



  export interface CityWeather  {
    coord: coordenadas;
    weather: clima[];  // clima[] | clima para prevenir cuando es arreglo, checar API
    main: principal;
    visibility: number;
    base: string;
    wind: viento;
    clouds: {};
    dt:number;
    sys: sistema;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export type CityValues = {
  country?: {label:string; value:string};
  city: string
}

type OptionType = { 
  label: string; 
  value: string 
};

export type RequestInputData = {
  values : CityValues;
  handleSubmit : (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (selectedOption: ValueType<OptionType>, event:ActionMeta)  => void;
}


