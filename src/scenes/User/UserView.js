import React, { useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useUsersCollecction } from '../../stores/Users/UsersCollections';
import { useStore } from '../../stores/createStore';
import { UserProductList } from './component/UserProductList';
import s from './UserView.module.scss';

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
          <div className={s.container}>
            {console.log(user)}
            <div className={s.container__user}>
              <div className={s.container__user__avatar}>
                <img src={user.avatar !== null ? user.avatar : 'PngItem_786293.png'} />
              </div>
              <div className={s.container__user__fullName}> 
                {' '}
                {user.fullName}
              </div>
              <div className={s.container__user__location}> 
                {' '}
                {user.location}
              </div>
            </div>
            <UserProductList userProduct={user} />
          </div>
        );
     
});

export default UserView;