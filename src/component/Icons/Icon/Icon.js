import React from 'react';
import { serviceIcon } from './serviceIcon'


const Icon = ({name}) => {
    const IconService = serviceIcon[name];
    return ( 
        <IconService />
    )
}

export default Icon;