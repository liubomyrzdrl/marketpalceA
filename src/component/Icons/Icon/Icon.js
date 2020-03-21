import React from 'react';
import t from 'prop-types';
import { serviceIcon } from './serviceIcon';


const Icon = ({ name }) => {
    const IconService = serviceIcon[name];
    return ( 
      <IconService />
    );
};

Icon.propType = {
    name: t.string,
};

export default Icon;