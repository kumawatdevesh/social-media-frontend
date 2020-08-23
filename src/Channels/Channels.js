import React, { useEffect, useState } from 'react';
import styles from './Channels.module.css';
import { NavLink } from 'react-router-dom';

function Channels() {

    const [channels, setChannels] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/channels/channel', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            setChannels(...channels, res.channels);
            console.log(res.channels);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    let channel;
    
    if(channels.length > 0) {
        channel = channels.map(i => {
            return <NavLink to={`/channels/${i._id}`} className={styles.channel} key={i._id}>
                <p>{i.name}</p>
                <p>{i.category}</p>
            </NavLink>
        }); 
    }

    return (
        <div className={styles.row}>
            <div className={styles.channels}>
                {channel}
            </div>
        </div>
    )
}

export default Channels;
