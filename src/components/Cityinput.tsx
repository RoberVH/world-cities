/**
 * CityInput - Display form to capture name of city abd optionally Country. Input and React Select
 *            controls call a callback method to uptade city/country values.  When search button is  clicked,
 *            it  calls a callback handling function to trigger searches
 * 
 */
  

import React from 'react';
import Select from 'react-select'
import { useTranslation } from 'react-i18next';
import { RequestInputData } from '../config/types'
import countryListOptions from '../data/countryList.json';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './Cityinput.css';



const CityInput = (props:RequestInputData ): JSX.Element => {
    const { t } = useTranslation();

    // style object to style react-select component **********************
    const customStyles = {
        option: (provided:any, state:any) => ({
          ...provided,
          color: 'gray',
          alignContent:'left',
          fontSize:'0.65rem',
          width:'9rem'

        }),
        control: (provided:any) => ({
            ...provided,
            fontSize:'0.65rem',
            fontFamily: 'inherit',
            border:'1px solid rgba(19, 121, 204,0.35);',
            borderRadius:10, 
            width:'10rem',
            height:'0.70rem' 
           }),
        singleValue: (provided: any, state: { isDisabled: any; }) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
      } 
    
    return ( 
        <Form inline >
        <Form.Group controlId="inputCity">
           <Row >
             <Col md="auto">
              <input autoFocus type="text"  id="city" required onChange={props.handleChange} 
                    placeholder={t('cityinput.selectcity')}
                    value={props.values.city || ''}  />
                  <Form.Text id="cityprompt"  className="city-input-tooltip">
                        {t("cityinput.promptcityinput")}
                    </Form.Text >
              </Col>
              <Col  md="auto"> 
                <Select 
                    name="country"
                    styles={customStyles}
                    options= {countryListOptions}
                    onChange= {props.handleSelectChange}
                    placeholder= {t('main.selectcountry')}
                 />
                 </Col>
                 <Col>
            <div className="button-cityinput-component city-input-component">
            <Button size="sm" type="submit" className="btn btn-primary" onClick={props.handleSubmit}> 
            <i className="fa">&#xf002;</i>
            </Button>   
            </div>
            </Col>
            </Row>
            </Form.Group>
         </Form>

    )   
}
export default CityInput;