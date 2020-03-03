import React from 'react';
import s from './Submit.module.scss';

function Submit({ text }) {
    return (
      <button type="submit" className={s.continue}>{text}</button>
    );
}

export default Submit;