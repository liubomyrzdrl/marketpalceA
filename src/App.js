import React, { useEffect }  from 'react'; 
import makeInspectable from 'mobx-devtools-mst';
import { createStore } from './stores/createStore';
import { Provider } from './stores/createStore.js';
import Modal from 'react-modal';
import  Router  from './scenes/routes';
import s from './App.module.scss';
import { getSnapshot } from 'mobx-state-tree';
import '@csstools/normalize.css';
const store = createStore();
store.bootstrap();


function App() { 
 
 console.log(getSnapshot(store));


//  useEffect(() => {
    
//  },[]);

 
  makeInspectable(store);
 
  return (
    <main className={s.wrapper}>        
      <Provider value={store}>
        <Router />
      </Provider>
    </main>
  );
}

Modal.setAppElement('#modalRoot');

export default App ;
