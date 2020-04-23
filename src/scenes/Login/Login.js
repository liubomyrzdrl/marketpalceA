import React, {useState} from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import s from './Login.module.scss';
import { MAIN } from '../../scss/variables.scss';
import { useStore } from '../../stores/createStore';
import { useHistory, Redirect } from 'react-router-dom';
import { routes } from '../routes';
import SimpleHeader from '../../component/Header/SimpleHeader';
import { Footer } from '../../component/Footer/Footer';
import { observer } from 'mobx-react';


export const Login = observer(() => {  
  const[loginError,setLoginError]=useState(false);
  const store = useStore(); 
  const history = useHistory();
 
   async function   onSubmit ({ email,password }) {      
    await store.auth.login.run({ email,password }); 
   
      const  serverMessage = store.logmessage.getMessage();              
        
        if(serverMessage==='WRONG_PASSWORD') {
           setLoginError(true);
        }
        if(serverMessage==='OK') {
          const arr = []; 
          const snapshot = window.localStorage.getItem('favs');     

            if(snapshot) {
                for(const i in JSON.parse(snapshot).entities.products.collection) {
                    if(JSON.parse(snapshot).entities.products.collection[i].saved === true ) {
                        arr.push(+JSON.parse(snapshot).entities.products.collection[i].id);
                    }   
                }                
               
              store.favorites.addArrayProductsFavorites.run(arr);
              window.localStorage.removeItem('favs');
              }
      
          setLoginError(false);
          history.push(routes.home);
       }
      }  
 
    function onRegister () {
        console.log('onRegister');
        history.push(routes.register);
    }
    return (
      <div className={s.login}>
        <div className={s.login__header}>
          <SimpleHeader color={MAIN} name='logo' />
        </div>
        <div className={s.login__blockContainer}>
          <div className={s.login__block}>
            <div className={s.logincontainer}>
              <div className={s.login__block_title}>
                Login
              </div>
        
              <LoginForm text="Login" onSubmit={onSubmit} />   
              { loginError && <div style={{ color: 'red' }}>WRONG EMAIL OR PASSWORD</div>}       
                      
              <div className={s.register}>
                <div className={s.register__content}> 
                  <div>I have no accaunt  </div>           
                  <div className={s.register__title} onClick={onRegister}>
                    REGISTER NOW        
                  </div>          
                </div>
              </div>
            </div>        
          </div>
        </div>
        <Footer />
      </div>
    );
});