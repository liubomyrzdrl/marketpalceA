import React from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import s from './Login.module.scss';
import { MAIN } from '../../scss/variables.scss';
import Header from '../../component/Header/Header';
import { useStore } from '../../stores/createStore';
import { useHistory } from 'react-router-dom';
import { routes } from '../routes';


export function Login () {  
const store = useStore();
const history = useHistory();
    function onSubmit ({ email,password }) {
      store.auth.login.run({ email,password });
      history.push(routes.home);
        console.log(email,password);

    }

    function onRegister () {
        console.log('onRegister');
    }
    return (
      <div className={s.login}>
        <div className={s.login__header}>
          <Header color={MAIN} />               
        </div>
        <div className={s.login__block}>
          <div className={s.logincontainer}>
            <div className={s.login__block_title}>
              Login
            </div>
     
            {/* { store.auth.login.isLoading ? ( */}
            {/* <div>...Loading</div> */}
            {/* ): */}
            <LoginForm text="Login" onSubmit={onSubmit} />          
            {/* </div> */}
          
            <div className={s.register}>
              <div>
                I have no accaunt             
                <div onClick={onRegister}>
                  REGISTER NOW        
                </div>          
              </div>
            </div>
          </div>  
   
        </div>
      </div>
    );
}