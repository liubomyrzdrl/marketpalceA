import { types, onSnapshot, applySnapshot, getParent, getRoot } from 'mobx-state-tree';
import { normalize } from 'normalizr';
import { RootStore } from './RootStore';

export function asyncModel(thunk, auto = true) { 
  const model = types.model('AsyncModel',{
      isLoading: false,
      isError: false,
  })
  .actions((store) => ({
    start () {
        store.isLoading = true;
        store.isError = false;
    },
    success() {
        store.isLoading = false;        
    },
    error (err) {
        store.isLoading = false;
        store.isError = true;
    },
      run (...arg){
       const promice = thunk(...arg)(
           store,
           getParent(store),
           getRoot(store)
           );
          if (auto){
              return store._auto(promice);        
          }
          return promice;
 
      },
      async _auto(promice){
          try {
              
              store.start();
               await promice;
    
               store.success();
          }catch(err){
            store.error(err);
          }                  
      },
      merge (items, shema ) {
      const result =  getRoot(store).entities.normalize(items, shema );
                return result;
      },
  }));

  return types.optional(model,{});
};  
 

export function createPersist (store) {    
    onSnapshot(store, (snapshot) => {
        //  console.log(JSON.stringify(snapshot,null,2) );
        window.localStorage.setItem('persist',
         JSON.stringify({
             auth: {
                   isLoggedIn: snapshot.auth.isLoggedIn, 
             },
             viewer: {
                 user: snapshot.viewer.user,
             },
         }));
    });
      function rehydrate () {
        const snapshot =  window.localStorage.getItem('persist');
        console.log(snapshot);
        if(snapshot) {
            applySnapshot(store,JSON.parse(snapshot));
        }
     }
    return {       
        rehydrate,
    };
};



export function createCollection(ofModel, asyncModels = {}) {
    const collection = types.model('CollectionModel', {
        collection: types.map(ofModel),
        ...asyncModels,
    })
    .views((store)=>({
        get(key) {
            return store.collection.get(String(key));
        },
        getAll() {
            return store.collection.values();
        },
    }))
    .actions((store)=>({
        add(key,value) {
            store.collection.set(String(key),value);
        },
        has(id) {
            if(id) {
                 return true;
                 } else {
                    return false;
                 }          
        },
        update (key,value) {
            this.add(key,value)
        }  ,     
    }));
    return types.optional(collection, {});
};
