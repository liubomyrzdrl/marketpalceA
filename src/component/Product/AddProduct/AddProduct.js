import React from 'react';
import SimpleHeader from '../../Header/SimpleHeader';
import { BLACK } from '../../../scss/variables.scss';
import s from './AddProduct.module.scss';
import { useLocation } from 'react-router-dom';
import { ProductForm } from '../component/ProductForm';


function removeDefaultAddProduct() {
  window.localStorage.removeItem('modalAddProduct');
}

export function AddProduct () {  
  let location = useLocation();
  
 console.log('locstion',location);

    return (
      <main className={s.container} onClick={removeDefaultAddProduct}>
        <SimpleHeader color={BLACK} name='logoWhite' />
        <div className={s.content}>
          <ProductForm />
        </div>
      
      </main>
    );
}

