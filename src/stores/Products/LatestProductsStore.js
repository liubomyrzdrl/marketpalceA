import React from 'react';
import { types, getParent, applySnapshot, getSnapshot } from "mobx-state-tree";
import { normalize } from 'normalizr';
import { asyncModel } from "../utils";
import Api from "../../api";
import { ProductModel } from "./ProductModel";
import { LatestProductCollection } from '../schemas';

function fetchLatest(limit ){ 
    return async function fetchLatestFlow(flow, store, Root) {
        const res = await Api.Products.fetchLatest( limit ); 
        const favStorage = window.localStorage.getItem('favs');
        const f = JSON.parse(favStorage);  
   
        console.log(res.data);
        
        const ids =  flow.merge(res.data, LatestProductCollection);         
        store.setItems(ids);
        
    };
}

function fetchLatestAdditional(id,limit){ 
    return async function fetchLatestFlow(flow, store, Root) {       
        const res = await Api.Products.fetchLatestPagiantion(id,limit);                        
        const ids =  flow.merge(res.data, LatestProductCollection);     
           store.setItemsAdd(ids);  
    };
}



export const LatestProductsStore =  types.model('LatestProductsStore',{
    items: types.array(types.reference(ProductModel)),
    // items: types.array( ProductModel),
    hasMore: false,
    fetchLatest: asyncModel(fetchLatest),
    fetchLatestAdditional: asyncModel(fetchLatestAdditional),

})
.actions((store) => ({
    setItems(items) {
        store.items = items;
    },
    setItemsAdd(items) {
        //todo example merge arr store.items = store.items.concat(items);
       //todo example merge arr    store.items.push(...items);
         store.items = [...store.items,...items];
       },
}));