import React from 'react';
import Select from 'react-select'
import { useTranslation } from 'react-i18next';
import { RequestInputData } from '../config/types'
import countryListOptions from '../data/countryList.json';



const CityInput = (props:RequestInputData ) => {
    const { t } = useTranslation();
    return (
        <div>
            <label> {t('cityinput.lblcity')}: </label> 
            <input autoFocus type="text"  id="city" required onChange={props.handleChange} value={props.values.city || ''}  />
            <label> {t('cityinput.lblcountry')}: </label> 
            <Select 
                name="country"
                options= {countryListOptions}
                onChange= {props.handleSelectChange}
                placeholder= {t('main.selectcountry')}
            />
            <button type="submit" onClick={props.handleSubmit}>
                 {props.values.country ? t('cityinput.searchcity') : t('cityinput.luckysearcher')} 
            </button>   
        </div>
    )   
}
export default CityInput;