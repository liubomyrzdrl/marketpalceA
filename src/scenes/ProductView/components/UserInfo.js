import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react'; 
import { NavLink, generatePath, useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { useUsersCollecction } from '../../../stores/Users/UsersCollections';
import { routes } from '../../routes';
import s from './UserInfo.module.scss';
import  ModalContainer  from './ModalContainer';


const StyleSheet = {
  overlay: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',    
    backgroundColor: 'rgba(255, 255, 255, 0.75)',   
  },
  content: {    
    width: '800px',
    height: '500px',
    boxShadow: '0px 2px 42px rgba(0, 0, 0, 0.111233)',
    borderRadius: '7px',
    alignSelf: 'center',

  },
};

 
const UserInfo = observer(({ product }) => {
  const [visible, setVisible] =useState(false);
  const [messageText,setText] = useState('');
  const history = useHistory();
  const userCollection = useUsersCollecction();
  
    useEffect(() => {
        if(!product.owner) {
            product. fetchOwner();
        }
    },[product]);

    if(userCollection.getById.isLoading) {
   
        return <div>Loading....</div>;
    }
    if (!product.owner) {
        return <div>Not Found </div>;
    };
 function handleChatWithSeller() {
   console.log('handleChatWithSeller');
   setVisible(true);
 }

 function handleClose() {
   setVisible(false);
 }

 async function handleCreateChat() {
 console.log('handleCreateChat');
   try {
      const chatId = await product.createChat.run(messageText);
      setVisible(false);
      history.push(generatePath(routes.inbox, { chatId }));
    } catch(err) {
      console.log(err);
    }

 }

    return (
      <div className={s.container}>
        <div className={s.owner}>
          <div className={s.owner__topblock}> </div>
          <NavLink to={generatePath(routes.users, { userId: product.owner.id })}>
            <div className={s.owner__avatar}>
              <img src={product.owner.avatar !== null ? product.owner.avatar : 'PngItem_786293.png'} />
            </div> 
            <div className={s.owner__fullname}>{product.owner.fullName}</div> 
            <div className={s.owner__location}>{product.owner.location}</div>
          </NavLink>    
        </div>
        <button type="button" onClick={handleChatWithSeller}>
          Chat with Seller
        </button>
        <Modal 
          isOpen={visible}
          onRequestClose={handleClose}
          style={StyleSheet}
        >
          <ModalContainer 
            value={messageText}
            setVisible={setVisible}
            product={product}
            onClick={handleCreateChat} 
            onChange={(event) => setText(event.target.value)}
          />
        </Modal>
      </div>
    );
});

export default UserInfo;
