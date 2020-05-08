import React from 'react';
import { types } from 'mobx-state-tree';


export const LogMessageStore = types.model('LogMessageStore',{
    message: types.optional(types.string,''),
  
})
.views(store => ({
    getMessage() {
       return store.message;
    },
}))
.actions(store =>({
    setMessage(message) {
        store.message=message;

    },
    getM() {
        return store.message;
    },
}));