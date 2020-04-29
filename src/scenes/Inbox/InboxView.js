import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link, generatePath, Route } from 'react-router-dom';
import { useStore } from '../../stores/createStore';
import { routes } from '../routes';
import MessageList from '../MessageList/MessageList';
import s from './InboxView.module.scss';
 

const  InboxView =  observer(() =>  {
    const chats = useStore((store) => store.chats);
    const selectedChat = window.location.pathname.slice(7);
    console.log(selectedChat);
     
    useEffect(() => {
        chats.fetch.run();
       
    },[chats.fetch]);

    return (
      <div className={s.inbox}>  
        
        <aside>
          {chats.items.map(item => (
            <Link to={generatePath( routes.chat,{ chatId: item.id } )} key={item.id}> 
           
              <div className={s.inboxItem}>
                <div 
                  className={s.inboxItem__focusedLabel} 
                  style={item.id === +selectedChat ? { backgroundColor: 'green', width: '3px' } : null}
                />   

                <div className={s.inboxItem__user}>                
                  <div className={s.inboxItem__user_fullName}>
                    {item.user.fullName}
                  </div>
                  <div className={s.inboxItem__user_message}>
                    {item.message.text}
                  </div>
                </div>

                <div className={s.inboxItem__product}>
                  <img src={item.product.photos[0]} />
                  <div className={s.inboxItem__product_context}>
                    <div className={s.inboxItem__product_title}>
                      {item.product.title}{item.id}
                    </div>
                    <div className={s.inboxItem__product_price}>
                      {item.product.price}
                    </div>
                  </div>
                </div>

                <div className={s.inboxItem__time}>
            
                  {/* { new Date().now()} */}
                </div>
              
              </div>
            </Link>
        ))}
        </aside>
        
        <div className={s.messageListBlock}>
          <Route path={routes.chat} component={MessageList} />
        </div>
                  
      </div>
    );
});

export default InboxView;