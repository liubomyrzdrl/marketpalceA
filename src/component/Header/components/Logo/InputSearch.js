import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import s from './InputSearch.module.scss';
import { useHistory, generatePath } from 'react-router-dom';
import { routes } from '../../../../scenes/routes';
import { useStore } from '../../../../stores/createStore';
import { observer } from 'mobx-react';
import uuid from 'uuid/v4';


export const  InputSearch =  observer(()=> {
  const[text, setText] = useState('');
  const [reload, setReload] = useState(false);
  const store = useStore();
  const  history  = useHistory();

  // useEffect(() => {
  //   if(reload) { 
  //     /* Call API here */ 
  //     store.searchProducts.fetch.run(text);     
  //   }
  // }, [reload]);
  
    function onSubmit () {
      if (text === '') {
        return;
      }else{
        history.push(generatePath(routes.searchProd,{ text }));
        setText('');
        
      }
       
    };
    // const callApi = () => { setReload(true); }; 
    // const [debouncedCallApi] = useState(() => _.debounce(callApi, 1000));    

    // function handleChange(e) { 
    //   setText(e.target.value);
    //   debouncedCallApi(); 
    // }

  const handleChange = _.debounce((e) => {    
            setText(e); 
           store.searchProducts.fetch.run(text);
  },1000);
 

    return (
      <div className={s.searchContainer}>
        <form onSubmit={onSubmit}>
          <div className={s.inputName}>
            <input type='text' onChange={e => handleChange(e.target.value)} value={text} />
            {/* <input type='text' onChange={handleChange}  /> */}
            {text===''? null : (
              <div className={s.inputProductsBlock} style={{ backgroundColor: '#fff' }}>
                {  store.searchProducts.items.map(item => {
                  return (
                    <div className={s.inputProductsContent} key={uuid()}>
                      <img alt={item.ownerId} src={item.photos[0]} />
                      <div>{item.title}</div>
                    </div>
                  );
                })}
              </div>
             )}
          </div>
    
          <button className={s.searchButton} type='submit'>search</button>
        </form>
      </div> 
    );
});