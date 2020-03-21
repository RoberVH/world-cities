export type coordenadas = {
    lon: number;
    lat: number
  }
  
export type clima = {
    id: number;
    main: string;           // Group of weather parameters (Rain, Snow, Extreme etc.)
    description: string;    // Weather condition within the group.
  //  icon: any
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
    sunrise?: number;
    sunset?: number;
  }

  export interface ClimaCiudad  {
    coord: coordenadas;
    weather: clima;  // clima[] | clima para prevenir cuando es arreglo, checar API
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

