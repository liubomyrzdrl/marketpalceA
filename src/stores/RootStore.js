import { types, applySnapshot } from 'mobx-state-tree';
import  { AuthStore } from '../stores/Auth/AuthStore';
import { ViewerStore } from '../stores/ViewerStore';

import Api, { SocketApi }   from '../api';
import { LatestProductsStore } from './Products/LatestProductsStore';
import { EntitieStore } from './EntityStore';
import { ChatStore } from './Chats/ChatStore';
import { SearchProductsStore } from './Products/SearchProductsStore';
import { LogMessageStore } from './Auth/LogMessageStore';
import { LatestProductsPaginationStore } from './Products/LatestProductsPaginationStore';


 
export const RootStore = types.model('RootStore',{
   auth: types.optional(AuthStore, {}),  
   viewer: types.optional(ViewerStore, {}),
   latestProducts: types.optional(LatestProductsStore, {}),
   latestProductsPagination: types.optional(LatestProductsPaginationStore, {}),
   searchProducts: types.optional(SearchProductsStore,{}),
   entities: types.optional(EntitieStore, {}),
   chats: types.optional(ChatStore, {}),
   logmessage: types.optional(LogMessageStore,{}) ,
})
.actions((store)=>({
   async bootstrap() { 
       try {
           const token = window.localStorage.getItem('___token');        
           if (!token) {
               console.log('Not Autorized');             
               throw  new Error('Not Autorized');           
           }
           Api.Auth.setToken(token);
           SocketApi.init(token);
           const res= await Api.Account.getUser(); 
           store.viewer.setViewer(res.data);       
           store.auth.setIsLoggedIn(true);    
           store.subscribeToEvents();       
       } catch (err) {
         console.log(err);
         applySnapshot(store,{

       });
       }
    },
    subscribeToEvents() {
        SocketApi.handleMessages(message => {        
          console.log('MESSAGE');
          console.log(message);
         store.chats.handleMessage(message);          
        });
      },
}));

