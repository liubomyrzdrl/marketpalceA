import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { List, AutoSizer  } from 'react-virtualized';
import { useParams } from 'react-router-dom';
import { useStore } from '../../stores/createStore';
import  Icon from '../../component/Icons/Icon/Icon';
import s from './MessageList.module.scss';

const MessageList = observer(() => {
  const { chatId } = useParams();
  const store = useStore();
  const ownerId =store.viewer.user.id;
  const [message, setMessage] = useState();
   
     
   const chat = useStore((store) => store.chats.getById(+chatId ));
    console.log(s.height);
    useEffect(() => {
      if(chat) {      
         chat.messages.fetch.run();           
      }       
    },[chat]);

    if(!chat ) {
        return <div>Loading....</div>;
    }

   function handleChange(evt) {
        setMessage(evt.target.value);
   }

   function handleSend() {
    
     chat.sendMessage.run(message);     
     setMessage('');
         }
       function rowRenderer({
          key, // Unique key within array of rows
          index, // Index of row within collection
          isScrolling, // The List is currently being scrolled
          isVisible, // This row is visible within the List (eg it is not an overscanned row)
          style, // Style object to be applied to row (to position it)
        }) {
               
          
          return (
            <div className={s.messageContent}>
         
              <div 
                key={key}  
                className={chat.messages.asList[index].ownerId === ownerId ? s.messageContent__itemOwn : s.messageContent__itemCustomer}
              >              
                {  chat.messages.asList[index].text }
              </div>

              <div className={chat.messages.asList[index].ownerId === ownerId ? s.timeMessageAgoOwn : s.timeMessageAgoCustomer}>
                {new Date().getDay() - new Date(chat.messages.asList[index].createdAt).getDay() > 0 && ( 
                <div className={s.messageContent__inf}>           
                  
                  {new Date().getDay() - new Date(chat.messages.asList[index].createdAt).getDay()}
                  day
                </div>
)}
                {new Date().getHours() - new Date(chat.messages.asList[index].createdAt).getHours() >0 && (
                <div  className={s.messageContent__inf}>
                  {' '}
                  {new Date().getHours() - new Date(chat.messages.asList[index].createdAt).getHours()}
                  hour 
                </div>
)}
                {new Date().getMinutes() - new Date(chat.messages.asList[index].createdAt).getMinutes() >0 && (
                <div  className={s.messageContent__inf}>
                  {new Date().getMinutes() - new Date(chat.messages.asList[index].createdAt).getMinutes()}
                  min
                </div >
)}
                <div  className={s.messageContent__inf}>ago</div>
              </div>
                  
             </div>
           
           );
        }
  

  
    return (
      <div>      
        {/* <ul className={s.messageContent}>
          {chat.messages.asList.map((item) =>  {        
            return (
              <li 
                className={item.ownerId === ownerId ? s.messageContent__itemOwn : s.messageContent__itemCustomer} 
                key={item.id}
              >               
                { item.text }                
              </li>
                );  
              })}
        </ul> */}
        <div className={s.list}> 
          <AutoSizer>
            { ({ width,height }) => {
             return (
               <List
                 width={width}
                 height={height}          
                 rowCount={chat.messages.asList.length}
                 rowHeight={80}
                 rowRenderer={rowRenderer}
                 overscanRowCount={1}
               />
);
           }}
          </AutoSizer>
        </div>
      
        <div className={s.sendMessageBlock}>
          <input type="text" onChange={handleChange} value={message || ' '} placeholder="Type youre message here" />
          {/* <button type="button" onClick={handleSend}>Send</button> */}
          <div className={s.sendMessageIcon} onClick={handleSend}>
            <Icon 
              name="sendMessage"
              className={s.sendMessageIcon}
              // onClick={handleSend}
            />
          </div>
        </div>
       
      </div>
    );
});

export default MessageList;