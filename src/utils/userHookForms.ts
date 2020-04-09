/*
*  userHookForm . Utility function to process events handlers on each form in the App
*/

import { useState } from 'react';
import { RequestInputData, CityValues } from '../config/types';

const useHooksForm = (callback:Function):RequestInputData => {

  const [values, setValues] = useState({} as CityValues);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    if (event) event.preventDefault();
      callback();
  };

  const handleChange = (event: { persist: () => void; target: { id: any; value: any; }; }) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.id]: event.target.value }));
  };

  // Configuring react-select signature this time is a bit hard to find informatio,  this method works ok for present version 3.1.0 
  // Notice that type is build with type["subtype"] as oppose to type.subtype (which won't work here)
  const handleSelectChange: RequestInputData["handleSelectChange"] = (selectedOption, event) => { 
    setValues(values => ({ ...values, [event.name!]: selectedOption!}));
    console.log('VAL',values.country?.value)
   }

  return {
    handleChange,
    handleSubmit,
    handleSelectChange,
    values,
  }
};

export default useHooksForm;