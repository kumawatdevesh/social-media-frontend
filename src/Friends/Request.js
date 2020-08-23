import React, { useEffect, useState } from 'react';
import styles from './Request.module.css';
import { NavLink } from 'react-router-dom';

function Request() {

    const [users, setUsers] = useState([]);
    const [recRequest, setRecRequest] = useState([]);
    const storeData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {

        fetch(`http://localhost:5000/posts/get-request/${storeData.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            res.users.map(i => {
                setUsers(...users, i.user);
            })
        })
        .catch(err => {
            console.log(err);
        })

    }, [storeData.userId]);

    useEffect(() => {
        fetch(`http://localhost:5000/posts/recieve-request/${storeData.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            res.users.map(i => {
                setRecRequest(...recRequest, i.user);
            })
        })
        .catch(err => {
            console.log(err);
        });

    }, [storeData.userId]);

    const acceptRequestHandler = (userId) => {
        
        const data = {
            userId: userId
        }

        fetch(`http://localhost:5000/posts/accept-request/${storeData.userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    };

    let requestSender, requestRecieved;

    if(recRequest.length > 0) {
        requestRecieved = recRequest.map(i => {
            return (
                <div key={i._id} className={styles.sentCard}>
                    <p>{i.sender.name}</p>
                    <NavLink to="/" onClick={() => acceptRequestHandler(i.sender._id)}>Accept</NavLink>
                </div>
            )
        })
    }

    if(users.length > 0) {
        requestSender = users.map(i => {
            return (
                <div key={i._id} className={styles.sentCard}>
                    <p>{i.rec.name}</p>
                </div>
            )
        })
    }

    return (
        <div className={styles.row}>
            <div className={styles.frame}>
                <div className={styles.sent}>
                    <p style={{display: 'block'}}>Request sent to</p>
                    {requestSender}
                </div>
                <div className={styles.recieve}>
                    {requestRecieved}
                </div>
            </div>
        </div>
    )
}

export default Request;
