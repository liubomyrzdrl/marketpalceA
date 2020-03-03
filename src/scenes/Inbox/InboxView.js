import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link, generatePath, Route } from 'react-router-dom';
import { useStore } from '../../stores/createStore';
import { routes } from '../routes';
import MessageList from '../MessageList/MessageList';
 

const  InboxView =  observer(() =>  {
    const chats = useStore((store) => store.chats);
    
    useEffect(() => {
        chats.fetch.run();
    },[]);

    return (
      <div>  
        <aside>
          <ul>
            {console.log(chats.items)}
            {chats.items.map(item => (
              <Link to={generatePath( routes.chat,{ chatId: item.id } )}>
                <li> 
                  {' '}
                  {item.id}
                  {' '}
                </li>
              </Link>
          ) 
          )}
          </ul>  
        </aside>
        <div>
          <Route path={routes.chat} component={MessageList} />
        </div>
                  
      </div>
    );
});

export default InboxView;