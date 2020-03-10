import React, { useEffect } from 'react';
 
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { BLACK } from '../../scss/variables.scss';
import SimpleHeader from '../../component/Header/SimpleHeader';
import s from './ProductSearch.module.scss';
import { useStore } from '../../stores/createStore';

export const ProductSearch = observer(() => {
    const { text } = useParams();
    const store =  useStore();
    
   useEffect(() => {
     if(text==='') { 
      return <div>Not found</div>;
       }else {
      store.searchProducts.fetch.run(text);               
     }
   },[]);
   
  if(store.searchProducts.fetch.isLoading) {
  
    return <div>Loading...</div>;
  }

    return (
      <div className={s.productSearchContent}>
        <SimpleHeader name='logoWhite' color={BLACK} />
        <ul>
          {
            store.searchProducts.items.map(item => {
                return (
                    <li>{item.title}</li>
                );
            })
          }
        </ul>
      </div>
    );
});

