import React, {useEffect, useState} from 'react';
import {useParams, NavLink} from 'react-router-dom';
import styles from './UserProfile.module.css';

function UserProfile() {

    const [user, setUser] = useState([]);
    const [post, setPosts] = useState([]);
    const userId = useParams().userId;

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
            setPosts(...post, res.user.posts);
        })
        .catch(err => {
            console.log(err);
        });
    }, [userId]);

    const onDeleteHandler = (id) => {

        setPosts(post.filter(i => i._id !== id));

        const data = {
            userId: userId
        }
        fetch(`http://localhost:5000/posts/delete/${id}`, {
            method: 'DELETE',
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
        })
    }

    let person;

    if(user.length > 0) {
        person = user.map(p => { 
            return (
                <div className={styles.card} key={p._id}>
                    <img src={`http://localhost:5000/${p.image}`} />
                    <div className={styles.user__data}>
                        <h2>Name: {p.name}</h2>
                        <p>Email: {p.email}</p>
                        <p>Following: {p.following.length}</p>
                        <h3>Friends: {p.friends.length}</h3>
                        <h1>Posts: {p.posts.length}</h1>
                        {post.map(post => {
                            return (
                                <div className={styles.posts} key={post._id}>
                                    <NavLink to={`/post/${post._id}`}>
                                        <div className={styles.post}>
                                            <img src={`http://localhost:5000/${post.image}`} />
                                            <p>{post.caption}</p>
                                        </div>
                                    </NavLink>
                                    <button onClick={() => onDeleteHandler(post._id)}>Delete</button>
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
                <NavLink to={`/update-profile/${userId}`}>Update Profile</NavLink>
                {person}
            </div>
        </div>
    )
};

export default UserProfile;
