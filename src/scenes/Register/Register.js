import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from '../../component/Header/Header';
import {useHistory} from 'react-router-dom';
import { routes } from '../routes';
import RegisterForm from './components/RegisterForm';

import s from './Register.module.scss';
import { MAIN } from '../../scss/variables.scss';
 

const Register = () => {
  const history = useHistory();
  const onLogIn = () => {
      history.push(routes.login);
  };
  const onContinue = () => {
    history.push(routes.home);
  };
  const onSubmit = () => {
    console.log('Register')
    // history.push(routes.home);
  };
    return (
      <main className={s.register}>
        <Header color={MAIN} />

        <div className={s.register__block}>
          <div className={s.registercontainer}>
            <div className={s.register__block_title}>
                  Register
            </div>
            {/* <label htmlFor="email">EMAIL</label> 
            <input type="email" placeholder="email"  id="email" /> 

            <label htmlFor="fullName">FULL NAME</label> 
            <input type="text" placeholder="Tony Start"  id="fullName" /> 

            <label htmlFor="email">PASSWORD</label> 
            <input type="password"  /> 

            <label htmlFor="email">PASSWORD AGAIN</label> 
            <input type="password"  />  */}
            <RegisterForm onSubmit={onSubmit} />

            {/* <button type="button" className={s.continue} onClick={onContinue}>Continue</button> */}
          </div>

          <div className={s.login}>
            <div>
                 I alredy have an accaunt
              <span onClick={onLogIn}>LOG IN</span>
            </div>
          </div>
        </div>
           

      </main>        
     
    );
};

export default Register;