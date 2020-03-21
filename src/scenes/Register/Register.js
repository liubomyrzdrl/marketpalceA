import React,{ useState } from 'react';
import { Switch, Route ,useHistory } from 'react-router-dom';

import { observer } from 'mobx-react';
import Modal from 'react-modal';
import Header from '../../component/Header/Header';
import { routes } from '../routes';
import RegisterForm from './components/RegisterForm';

import s from './Register.module.scss';
import { MAIN } from '../../scss/variables.scss';
import SimpleHeader from '../../component/Header/SimpleHeader';
import { Footer } from '../../component/Footer/Footer';
import { useStore } from '../../stores/createStore';
 

const Register = observer(() => {
  const store = useStore();
  const[registerError,setRegisterError] = useState(false);
  const [modalIsOpen,setModalIsOpen] = React.useState(false);
  const history = useHistory();

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  
  const onLogIn  = () => {
      history.push(routes.login);
  };

  const onSubmit = () => {
    console.log('Register');
    const serverMessage = store.logmessage.getMessage();
    if(serverMessage==='WRONG_PASSWORD') {
      setRegisterError(true);
   }
   if(serverMessage==='OK') {
     //When registration is succsees 
     //Open modal window 
     setRegisterError(false);
     setModalIsOpen(true);
     //After 4 sec modal will be closed and will be redirection to the login form 
     setTimeout(()=> {
      setModalIsOpen(false);
      history.push(routes.login);
     },4000);
  }
    // history.push(routes.home);
  };

  function afterOpenModal() {
    var subtitle;
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
    return (
      <div className={s.register}>
        <div className={s.login__header}>
          <SimpleHeader color={MAIN} name='logo' />
          {/* <Header color={MAIN} name='logo' />                */}
        </div>
        <div className={s.register__container}>
          <div className={s.register__block}>
            <div className={s.registercontainer}>
              <div className={s.register__block_title}>
                RegisterTest
              </div>
           
              <RegisterForm onSubmit={onSubmit} />
              { registerError && <div style={{ color: 'red' }}>Error. Registration failed </div> }
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                // closeTimeoutMS={4000}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h3>You have registred succsesfully.</h3>
                <div>Please Log in</div>
              </Modal>
            </div>

            <div className={s.login}>
              <div>
                I alredy have an account
                <span onClick={onLogIn}>LOGIN</span>
              </div>
            </div>
          </div> 
        </div>
        <Footer />      
      </div>       
    );
});

export default Register;