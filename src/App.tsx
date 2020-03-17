import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import ciudades from './data/city.list.json';


// 

//declare function buscar_ciudadesxpais(ciudades:String[]):String[];

interface Ciudad  {
     id: number;
    name: string;
    state: string;
    country: string;
    coord: {
      lon: number;
      lat: number
    }  
}

const [reporteClima,setReporte]=useState({});


// const asigna_ciudades=(lista:Ciudad[]):Ciudad[] => {
//   return lista;
// }

const APIURL= 'api.openweathermap.org/data/2.5/weather';
const APIKEY= process.env.OPENWEATHERMAP_APIKEY

const getAXIOSCiudades = (param: string) => axios.get(`${APIURL}/?1q=${param}&units=metric&lang=es&apiid=${APIKEY}`);

// // const get_ciudades: (ciudades:Ciudad[]) => Ciudad[] =
// //     (lciudades: Ciudad[]) => { return  lciudades.filter((city:Ciudad) => (city.country)==='MX'); }

// // let ciudades_Mexico=get_ciudades(lista);


const buscarCiudades = async (e: any) => {
// 
const listaCiudades = await getAXIOSCiudades('Saltillo');
setReporte(listaCiudades);
}


function App() {
  return (
    <div className="App">
      <div>
         <button onClick={buscarCiudades}>Buscar Ciudades</button>
      </div>
      <hr></hr>
      <div>
        {reporteClima}
      </div>
  
    </div>
  );
}

export default App;
