import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

function TestContainer(props) {
    const location = useLocation();
    console.log('location' ,location)
    return (
       
        <div>
            <h4>TestContainer</h4>
            <Switch >
                <Route children={TestChildren}/>
            </Switch>
        </div>
    );
}

function TestChildren(props) {

    return (
        <div>
            <h4>children</h4>            
        </div>
    );
}

export default TestContainer;