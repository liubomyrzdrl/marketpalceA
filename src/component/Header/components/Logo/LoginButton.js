import React from 'react';
import propTypes  from 'prop-types';
import s from './LoginButton.module.scss';

export  function LoginButton ({ colorFont, onClick }) {
    return (
      <div className={s.loginButton} style={{ color: colorFont }}>
        <span onClick={onClick}>login</span>
      </div>
    );
} 


LoginButton.propTypes  =  {
  colorFont: propTypes .string,
  onClick: propTypes .func,
};