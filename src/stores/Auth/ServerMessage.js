import React from 'react';
import { types } from 'mobx-state-tree';


export const ServerMessage=types.model({
    text: types.string,
});