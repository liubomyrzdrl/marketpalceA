import React from 'react';
import SimpleHeader from '../../Header/SimpleHeader';
import { BLACK } from '../../../scss/variables.scss';
import s from './AddProduct.module.scss';
import { useLocation } from 'react-router-dom';
import { ProductForm } from '../component/ProductForm';


// function removeDefaultAddProduct() {
//   window.localStorage.removeItem('modalAddProduct');
// }

export function AddProduct () {  

    return (
      <main className={s.container} >
        {/* <SimpleHeader color={BLACK} name='logoWhite' /> */}
        <div className={s.content}>
          <h4>AddProduct</h4>
          <ProductForm />
        </div>
      
      </main>
    );
}

