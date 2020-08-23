import React from 'react';
import axios from 'axios';

function User() {

    axios.get('http://localhost:5000/posts/post')
    .then(res => {
        console.log(res.data);
    })    
    .catch(err => {
        console.log(err);
    });
    
    return (
        <div>
            
        </div>
    )
}

export default User;;
