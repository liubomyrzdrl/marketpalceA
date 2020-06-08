import React  from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from '../../routes';
import { useStore } from '../../../stores/createStore';



export const PrivateRoute = ( { component: Component, ...rest } ) => {
   const store = useStore();
   console.log(!store.auth.isLogin ? 'component': 'redirect');
   console.log(Component);
   
    return (
      <Route 
        {...rest} 
        render={props => store.auth.isLogin ? (<Redirect to={routes.home} />) :( <Component {...props} /> )}
      />
    );
};

