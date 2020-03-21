import React from 'react';
import s from './Submit.module.scss';

const  Submit =({ text }) => {
 
    return (
      <button type="submit" className={s.continue}>{text}</button>
    );
};

export default Submit;