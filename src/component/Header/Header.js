import React, { useState, useRef, useEffect } from 'react';
import { useHistory , NavLink, Link } from 'react-router-dom'; 
import t from 'prop-types';

import { observer } from 'mobx-react';
import Modal from 'react-modal';
import Icon from '../Icons/Icon/Icon';
import s from './Header.module.scss';
import { routes } from '../../scenes/routes';
import { useStore } from '../../stores/createStore';
import { InputSearch } from './components/Logo/InputSearch';
import { LoginButton } from './components/Logo/LoginButton';
import { AddProduct } from '../Product/AddProduct/AddProduct';
import { ProductForm } from '../Product/component/ProductForm';
 

const UserInfo = observer(() => {
  const [visible, setVisible] =useState(false);
  const node = useRef();
  const store = useStore();
  useEffect(()=>{
      document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  },[]);

   const  handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      setVisible(true);
      return;
    }
    setVisible(false);
   };
  function handleOpen(){
    setVisible(true);
  }

  return (
    <div className={s.userInfo} ref={node}> 
      <div className={s.userInfo__front} onClick={handleOpen}>
        <div className={s.fullName}>{store.viewer.user.fullName.slice(0,1)}</div>
      </div>
      {visible && (
        <div className={s.modalUserInfo}>
          <div className={s.modalUserInfoTop}>
            <div className={s.userInfo__front} onClick={handleOpen}>
              <div className={s.fullName}>{store.viewer.user.fullName.slice(0,1)}</div>
            </div>
            <div className={s.userInfoProf}>
              <div className={s.fullName}>{store.viewer.user.fullName}</div>
              <div className={s.email}>{store.viewer.user.email}</div>      
            </div>      
          </div>
        
          <div className={s.editeProfile}>
            <Link to={routes.editeProfile}>edite profile</Link>            
          </div>
          <div className={s.buttonLogout} onClick={store.auth.logout}>
            logout
          </div>
        </div>
        )}      
    </div>
  );
});

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  
  }
};

const Header = observer(({ color, name, colorFont }) => {
  const [isOpen, setIsOpen] = useState(false);
  const  history  = useHistory();
  const store = useStore();

  function navigateToLogin () {
    history.push(routes.login);    
  }

  function handleOpen() {
    if(store.auth.isLogin === true) {
      setIsOpen(true);
      window.localStorage.setItem('modalAddProduct', true);
    } else {
      history.push(routes.login);
    }

  }
   function handleClose() {
    setIsOpen(false);
    window.localStorage.removeItem('modalAddProduct');
   }
     return (
       <header className={s.container} style={{ background: color }}>
         <NavLink to={routes.home} className={s.iconHome}>
           <Icon name={name} />
         </NavLink>  
         <InputSearch />        
         <div className={s.right}>
           <NavLink to={routes.inbox} className={s.right__chat}>
             <Icon name='chat' />
           </NavLink>  
           <div className={s.sellButton} onClick={handleOpen}>
             <button type="button">SELL</button>
           </div>   
           <Modal
             isOpen={isOpen}
             onRequestClose={handleClose}
             style={customStyles}
             
           >
             <div>Sell Modal</div>
             <ProductForm />
           </Modal>
           {!store.auth.isLogin ? (
             <LoginButton colorFont={colorFont} onClick={navigateToLogin} />
              ) : <UserInfo />}
           <div className={s.likeIcon}>
             <NavLink to={routes.faivorites}>
               <Icon name='likeWhite' />
             </NavLink>
           </div>                  
         </div>
       </header>
    );
});

export default Header;

Header.propTypes = {
 color: t.string,
};

