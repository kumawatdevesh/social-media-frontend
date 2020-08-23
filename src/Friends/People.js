import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import Notification from '../Notification/Notification';
import openSocket from '../socket';
import styles from './People.module.css';
import { Socket } from 'socket.io-client';

function People() {

    const [users, setUsers] = useState([]);
    const [not, setNot] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const storedData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {

        fetch(`http://localhost:5000/posts/users/${storedData.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            setUsers([...res.users]);
            setFilteredUsers([...res.users]);
        })
        .catch(err => {
            console.log(err);
        });

    }, [storedData.userId]);

    const sendFriendRequestHandler = (userId) => {

        let data = {
            from: storedData.userId,
            to: userId
        }

        fetch(`http://localhost:5000/posts/request/${storedData.userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            const socket = openSocket('http://localhost:5000');
            socket.on('friendRequest', io => {
                
            })
            return res.json();
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    };

    const searchHandler = (e) => {
        const value = e.target.value.toLowerCase();
        setFilteredUsers(users.filter(u => {
            return u.name.includes(value);
        }));
    };

    return (
        <div className={styles.row}>
            <div className={styles.wrapper}>
                <input type="text" placeholder="search for friends" 
                onChange={searchHandler}/>    
                <div className={styles.users}>
                    {filteredUsers.map(u => {
                        return (
                            <div className={styles.user} key={u._id}>
                                <div className={styles.user__content}>
                                    <img src={`http://localhost:5000/${u.image}`} alt="image" className={styles.user__image} />
                                    <p>{u.name}</p>
                                </div>
                                <NavLink className={styles.send__request} to={`/people`} 
                                onClick={() => sendFriendRequestHandler(u._id)}>Send</NavLink>
                            </div>
                        )
                    })}
                </div> 
            </div> 
            {not && <Notification request={not} />}
        </div>
    )
}

export default People;
