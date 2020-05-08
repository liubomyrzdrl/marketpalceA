import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { List } from 'react-virtualized';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useParams } from 'react-router-dom';
import ResizeObserver from 'resize-observer-polyfill';
import { useStore } from '../../stores/createStore';
import  Icon from '../../component/Icons/Icon/Icon';
import s from './MessageList.module.scss';
import  HOCsize  from './components/HOCsize';

const MessageList = observer(() => {
  const { chatId } = useParams();
  const [Height,setHeight] = useState(0);
  const [Width,setWidth] = useState(0);
  const store = useStore();
  const ref = useRef();
  const ownerId = store.viewer.user.id;
  const [message, setMessage] = useState();
  const chat = useStore((store) => store.chats.getById(+chatId ));
 
  useEffect(() => {
    if(chat) {      
      chat.messages.fetch.run();           
    }      
  },[chat]);
  
  useEffect(() => {
    const el = ref.current;
    
    if (!el) return;
    function handleResize() {
      const {  height, width } = el.getBoundingClientRect();
      setHeight(height);
      setWidth(width);
    }
    
    // resize observer is a tool you can use to watch for size changes efficiently
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(el);
    
    return () => resizeObserver.disconnect();
  }); 
  

    if(!chat ) {
        return <div>Loading....</div>;
    }

   function handleChange(evt) {
        setMessage(evt.target.value);   
   }
  

   function handleSend() {    
     chat.sendMessage.run(message);    
   //  console.log()
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
            <div style={style} key={key}>
           
              <div className={chat.messages.asList[index].ownerId === ownerId ? s.messageContentOwn : s.messageContentCustomer}>         
                    
                <div className={s.messageContent__item}> 
                  <span> 
                    {' '}
                    {chat.messages.asList[index].text }
                  </span>
                </div>
                <div className={s.timeMessage}>
                  {new Date().getDay() - new Date(chat.messages.asList[index].createdAt).getDay() > 0 && ( 
                  <div className={s.message__inf}>           
                  
                    {new Date().getDay() - new Date(chat.messages.asList[index].createdAt).getDay()}
                    day
                  </div>
)}
                  {new Date().getHours() - new Date(chat.messages.asList[index].createdAt).getHours() > 0 && (
                  <div className={s.message__inf}>
                    {' '}
                    {new Date().getHours() - new Date(chat.messages.asList[index].createdAt).getHours()}
                    hour 
                  </div>
)}
                  {new Date().getMinutes() - new Date(chat.messages.asList[index].createdAt).getMinutes() > 0 && (
                  <div className={s.message__inf}>
                    {new Date().getMinutes() - new Date(chat.messages.asList[index].createdAt).getMinutes()}
                    min
                  </div>
)}
                  <div className={s.message__inf}>ago</div>
                </div>              
              </div>  
            </div>         
           );
        }
  
    return (
      <div className={s.listCont}>      
        <div className={s.list} ref={ref}>   
          <List
            height={Height}
            width={Width}   
            rowCount={chat.messages.asList.length}
            rowHeight={80}
            rowRenderer={rowRenderer}
            overscanRowCount={3}
            scrollToIndex={chat.messages.asList.length-1}
          />
      
        </div>
        {/* <ul>
        {chat.messages.asList.map(item => {
          return (
            <li key={item.id}>{item.text}</li>
          );
        })}
      </ul> */}

      
        <div className={s.sendMessageBlock}>
          <input type="text" onChange={handleChange} value={message || ' '} placeholder="Type youre message here" />
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