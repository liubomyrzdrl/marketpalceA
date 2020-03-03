import React from 'react';
import { createCollection, asyncModel } from '../utils';
import {  ProductModel } from '../../stores/Products/ProductModel';
import { useStore } from '../createStore';
import Api from '../../api';
import { Product } from '../schemas';
import { normalize } from 'normalizr';

export function useProductCollection () {
 const store = useStore();
 return store.entities.products;
}

function getProduct (id) {
    return async function getProductFlow (flow) {
        try {
           const res = await Api.Products.getById(id);    
        //    const { entities } = normalize(res.data, Product);                      
        //    Root.entities.merge(entities);    
           flow.merge(res.data, Product);

        } catch(err) {
            console.log(err);       
        }
      
         
    };
}

export const ProductCollection = createCollection(ProductModel,{
    getProduct: asyncModel(getProduct),
});
