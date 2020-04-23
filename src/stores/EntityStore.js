import  { types } from 'mobx-state-tree';
import { ProductCollection } from './Products/ProductsCollection.js';
import  { normalize } from 'normalizr';
import { UsersCollection } from './Users/UsersCollections.js';
import { ChatsCollection } from './Chats/ChatsCollection.js';
import { MessageCollection } from './Chats/MessageCollection.js';
import { FavoritesCollection } from './Favorites/FavoritesCollections.js';

export const EntitieStore = types.model('EntitieStore', {
    products: types.optional(ProductCollection, {}),
    users: types.optional( UsersCollection,{}), 
    chats: types.optional(ChatsCollection,{}),
    favorites: types.optional(FavoritesCollection,{}),
    messages: types.optional(MessageCollection,{}),
})
.actions((store) => ({
   merge(entities) {
        Object.keys(entities).forEach(colectionName => {
           const collectionEntities = entities[colectionName];
           console.log(collectionEntities);
           console.log(entities);
           Object.keys(collectionEntities).forEach(id => {
                const value = collectionEntities[id];
              
                if (store[colectionName].has(id)) {
                  store[colectionName].update(id,value);
                } else {
                  store[colectionName].add(id,value);
              }
               //  console.log(store.users.collection);
           });
        }); 
   },
   normalize(items, schema) {
      const { result, entities } = normalize(items, schema);
       store.merge(entities);
       return result;
     },
}));