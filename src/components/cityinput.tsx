import React from 'react';
import { useTranslation } from 'react-i18next';
import { RequestInputData } from '../config/types'
//import iso3166CountryArray from '../data/iso3166countrues.json';


const CityInput = (props:RequestInputData ) => {
    const { t } = useTranslation();
    
    return (
        
        <div>
            <label> {t('cityinput.lblcountry')}: </label> 
            <input autoFocus type="text"  id="country"  onChange={props.handleChange} value={props.values.country || ''}  />
            <label> {t('cityinput.lblcity')}: </label> 
            <input autoFocus type="text"  id="city" required onChange={props.handleChange} value={props.values.city || ''}  />
            <button type="submit" onClick={props.handleSubmit}> Buscar </button>   
    <label style={{color:'red'}}>{props.values.country}</label>
        </div>
    )   
}


export default CityInput;
