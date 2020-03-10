import React from 'react';
import { types } from 'mobx-state-tree';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';
import Api from '../../api';
import { SearchProductShema } from '../schemas';
 

export const SearchProductsStore = types.model('SearchProductsStore',{
    items: types.array(types.reference(ProductModel)),
    fetch: asyncModel(fetchSearch),
})
.actions((store) =>({
    setItems(items){
        store.items=items; 
    },  
}));

 function fetchSearch (text) {
     return async function fetchSearchFLow(flow,store) {
           const res = await Api.Products.getProductsSearch(text); 
           const ids = flow.merge(res.data, SearchProductShema );
           store.setItems(ids);
     };
 }