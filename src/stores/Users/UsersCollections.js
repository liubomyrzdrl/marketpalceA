import { UserModel } from './UserModel';
import { createCollection, asyncModel } from '../utils';
import Api from '../../api';
import { User } from '../schemas';
import { useStore } from '../createStore';



export function useUsersCollecction() {
    const store =  useStore();
    return store.entities.users;    
}


function getById (id ) {
 return async function getByIdFlow (flow,store, Root) {
     try {
         const  res = await Api.Users.getById(id); 
         flow.merge(res.data, User);
        console.log(store.collection.get(id));
     }catch (err) {
         console.log(err);
     }
 
 };
}

export const UsersCollection = createCollection( UserModel,{
    getById: asyncModel( getById),
});
