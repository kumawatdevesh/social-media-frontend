import React from 'react';
import {Redirect} from 'react-router-dom';

function Error() {
    return (
        <div>
            <Redirect from="*" to="/"/>
        </div>
    )
}

export default Error;
