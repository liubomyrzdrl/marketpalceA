import React, { useState, useRef, useEffect } from 'react';
import { useHistory , NavLink } from 'react-router-dom'; 
import t from 'prop-types';

import { observer } from 'mobx-react';
import Modal from 'react-modal';
import Icon from '../Icons/Icon/Icon';
import s from './Header.module.scss';
import { routes } from '../../scenes/routes';
import { useStore } from '../../stores/createStore';
import { InputSearch } from './components/Logo/InputSearch';
import { LoginButton } from './components/Logo/LoginButton';
 

const UserInfo = observer(() => {
  const [visible, setVisible] =useState(false);
  const node = useRef();
  const store = useStore();
  useEffect(()=>{
      document.addEventListener('mousedown',handleClick);
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
            edite profile
          </div>
          <div className={s.buttonLogout} onClick={store.auth.logout}>
            logout
          </div>
        </div>
        )}      
    </div>
  );
});

const Header = observer(({ color, name, colorFont }) => {
  const  history  = useHistory();
  const store = useStore();
  function navigateToLogin () {
    history.push(routes.login);    
  }
     return (
       <header className={s.container} style={{ backgroundColor: color }}>
         <NavLink to={routes.home} className={s.iconHome}>
           <Icon name={name} />
         </NavLink>  
         <InputSearch />        
         <div className={s.right}>
           <NavLink to={routes.inbox} className={s.right__chat}>
             <Icon name='chat' />
           </NavLink>  
           <div className={s.sellButton}>
             <button type="button">SELL</button>
           </div>   
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

