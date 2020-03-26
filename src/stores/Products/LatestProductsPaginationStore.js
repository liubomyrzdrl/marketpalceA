import React from 'react';
import { types, getParent } from "mobx-state-tree";
import { normalize } from 'normalizr';
import { asyncModel } from "../utils";
import Api from "../../api";
import { ProductModel } from "./ProductModel";
import { LatestProductCollection, PaginationProductCollection } from '../schemas';

function fetchLatest(id,limit){ 
    return async function fetchLatestFlow(flow, store, Root) {
        const res = await Api.Products.fetchLatestPagiantion( id,limit );         
        const ids =  flow.merge(res.data, PaginationProductCollection);                
        store.setItems(ids);            
    };
}


export const LatestProductsPaginationStore =  types.model('LatestProductsStore',{
    items: types.array(types.reference(ProductModel)),
    // items: types.array( ProductModel),
    fetchLatest: asyncModel(fetchLatest),
})
.actions((store) => ({
    setItems(items) {
        store.items = store.items.concat(items);
    },
}));