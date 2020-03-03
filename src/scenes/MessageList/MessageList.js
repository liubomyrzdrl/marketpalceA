import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../stores/createStore';

const MessageList = observer(() => {
   const { chatId } = useParams();
  // const store = useStore();
   const [message, setMessage] = useState();
     
   const chat = useStore((store) => store.chats.getById(+chatId ));


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
         
//   chat.messages.asList.map((item) => {
//    console.log(item);
// });
    return (
      <div>
      
        <ul>
          {chat.messages.asList.map((item) =>  {        
            return (
              <li key={item.id}>{item.text}</li>
                );  
              })}
        </ul>
        <textarea onChange={handleChange} value={message} />
        <button type="button" onClick={handleSend}>Send</button>
      </div>
    );
});

export default MessageList;