import { createCollection } from '../utils';

import { useStore } from '../createStore';
import { MessageModel } from './MessageModel';

export function useChatCollecction() {
    const store = useStore();
    return store.entities.chats;    
}

export const MessageCollection = createCollection( MessageModel, {

});
