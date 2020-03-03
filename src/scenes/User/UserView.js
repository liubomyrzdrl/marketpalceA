
import React, { useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import { useUsersCollecction } from '../../stores/Users/UsersCollections';
import { useStore } from '../../stores/createStore';
import { observer } from 'mobx-react';
import { UserProductList } from './component/UserProductList';

const UserView = observer(() => { 
   const { userId } = useParams();
   const userCollection = useUsersCollecction();

const user = userCollection.get(userId); 
  

     useEffect(() =>{
       if(!user) {       
           userCollection.getById.run(userId);    
          //  user.ownProducts.fetch.run();
        }
   });
   //  useEffect(() =>{
  //   if(!user.ownProducts.items) {       
  //     user.ownProducts.fetch.run();
  //      //  user.ownProducts.fetch.run();

  //    }

// });

 
   if(userCollection.getById.isLoading ) {    
     return <div>Loading ...</div>;          
   } 
   if(!user) {
      return <div>Not Found </div>;
   }
       
        return (
          <>
          {console.log(user.ownProducts.items)}
           <div>User {user.fullName}</div>
            <UserProductList userProduct={user} />
          </>
        );
     
});

export default UserView;