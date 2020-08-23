import React, {useEffect, useState} from 'react';
import {useParams, NavLink} from 'react-router-dom';
import styles from './PostProfile.module.css';

function PostProfile() {

    const [user, setUser] = useState([]);
    const userId = useParams().userId;
    const storedData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        fetch(`http://localhost:5000/auth/userdetails/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            setUser([...user, res.user]);
        })
        .catch(err => {
            console.log(err);
        });
    }, [userId]);

    const onFollowHandler = (userId) => {
        
        const data = {
            userId: userId
        }

        fetch(`http://localhost:5000/auth/follow/${storedData.userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    };

    let person;

    if(user.length > 0) {
        person = user.map(p => {
            return (
                <div className={styles.card} key={p._id}>
                    <img src={`http://localhost:5000/${p.image}`} />
                    {
                        storedData.userId === p._id ? <NavLink to="/" onClick={() => onFollowHandler(p._id)} className={styles.follow}>Follow</NavLink> : ''
                    }
                    <div className={styles.user__data}>
                        <h2>Name: {p.name}</h2>
                        <p>Email: {p.email}</p>
                        <h3>Friends: {p.friends.length}</h3>
                        <h1>Posts: {p.posts.length}</h1>
                        {p.posts.map(post => {
                            return (
                                <div className={styles.posts} key={post._id}>
                                    <NavLink to={`/post/${post._id}`}>
                                        <div className={styles.post}>
                                            <img src={`http://localhost:5000/${post.image}`} />
                                            <p>{post.caption}</p>
                                        </div>
                                    </NavLink>
                                </div>
                            )
                        })}
                    </div>
               </div>
            )
        })
    }

    return (
        <div className={styles.row}>
            <div className={styles.user__details}>
                {person}
            </div>
        </div>
    )
};

export default PostProfile;
