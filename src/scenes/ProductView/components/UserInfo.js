import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react'; 
import { NavLink, generatePath, useHistory } from 'react-router-dom';
import { useUsersCollecction } from '../../../stores/Users/UsersCollections';
import Modal from 'react-modal';
import { routes } from '../../routes';


 
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
      <div>
        <div>
          <NavLink to={generatePath(routes.users, { userId: product.owner.id })}>{ product.owner.fullName}</NavLink>    
        </div>
        <button type="button" onClick={handleChatWithSeller}>
          Chat with Seller
        </button>
        <Modal 
          isOpen={visible}
          onRequestClose={handleClose}
        >
          <textarea 
            type="text"
            value={messageText}
            onChange={(event) => setText(event.target.value)}
          />       
          <button type="button" onClick={handleCreateChat}> 
            Send Message
          </button>
        </Modal>
      </div>
    );
});

export default UserInfo;