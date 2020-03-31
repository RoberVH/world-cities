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
/*
  const resetForm = () => {
      for (let prop in values)
          setValues(values[prop]=null)
    
  }*/
  return {
    handleChange,
    handleSubmit,
    values,
  }
};

export default useHooksForm;