import React from 'react';
import { useField } from 'formik';
import s from './Input.module.scss';

function Input({ label, ...props }) {
    const [field, meta] = useField(props);

    return (
      <div className={s.container}> 
    
        <label htmlFor='input'>
          {label}
          <input {...field} {...props} id="input" />
        </label>    
        {meta.touched && meta.error &&  <div>{meta.error}</div>}        
      </div>
    );
}

export default Input;