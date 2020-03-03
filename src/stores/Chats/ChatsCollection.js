import { createCollection } from '../utils';
import { ChatModel } from './ChatModel';
import { useStore } from '../createStore';

export function useChatCollecction() {
    const store = useStore();
    
    return store.entities.chats;    
}

export const ChatsCollection = createCollection( ChatModel, {

   });
