import React, { Component, useState, useEffect, useRef } from 'react';
import { useStore } from '../../../stores/createStore'
import { pure } from 'recompose';
import { useParams } from 'react-router-dom';
// import ResizeObserver from "resize-observer-polyfill";
import ResizeObserver from 'resize-observer-polyfill';
import { observer } from 'mobx-react';


export const  HOCsize =  ( props) => {

 const [height,setHeight] = useState(0);
 const [width,setWidth] = useState(0);
 const [listLenght, setListLength] = useState(0);
 const ref = useRef();
 const store = useStore();
 const ownerId = store.viewer.user.id;
 
 const { chatId } = useParams();
 const chat = useStore((store) => store.chats.getById(+chatId )); 

   console.log(listLenght);

 

 useEffect(()=>{
 
    if(chat) {      
        chat.messages.fetch.run();           
         
       
     }     
      
 },[chat]);

 useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function handleResize() {
        const { height, width} = el.getBoundingClientRect();
        console.log(height);
        setHeight(height);
        setWidth(width);
      }
  
      // resize observer is a tool you can use to watch for size changes efficiently
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(el);
  
      return () => resizeObserver.disconnect();
 }); 

    return (
      <div ref={ref} style={{ height: '100%',width: '100%' }}> 
        { props.children({ height,width,listLenght }) } 
      </div>
      );
};

export default observer(HOCsize);