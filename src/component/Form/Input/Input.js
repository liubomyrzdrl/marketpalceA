import React from 'react';
import { useField } from 'formik';
import s from './Input.module.scss';
 
import t from 'prop-types';

const Input =  ({ label, ...props }) => {
    const [field, meta] = useField(props);
 
    return (
      <div className={s.container}>     
        <label htmlFor='input'>
          <div className={s.labelTitle}>{label}</div>
          <input {...field} {...props} style={meta.error && { borderColor: 'red' }} />         
        </label>    
        { meta.error &&  <div style={{ color: 'red',marginBottom: '1%' }}>{meta.error}</div>}        
      </div>
    );
};

export default Input;

Input.propTypes = {
  onChange: t.func,
};