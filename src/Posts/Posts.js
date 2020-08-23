import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Posts.module.css';
import openSocket from '../socket';
import {connect} from 'react-redux';
import axios from 'axios';
import Comments from './Comments';

function Posts() {
    
    let [posts, setPosts] = useState([]);
    let [comment, setComment] = useState('');
    let [showComments, setShowComments] = useState(false);
    const storedData = JSON.parse(localStorage.getItem('userData'));

    const decLikes = (id) => {
        const data = {
            userId: storedData.userId
        }
        axios.patch(`http://localhost:5000/posts/dec-likes/${id}`, data)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const incLikes = (id) => {
        const data = {
            userId: storedData.userId
        }
        axios.patch(`http://localhost:5000/posts/inc-likes/${id}`, data)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    useEffect(() => {
        fetch('http://localhost:5000/posts/post', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            setPosts([...res.posts]);
        })
        .catch(err => {
            console.log(err);
        });

    }, [incLikes, decLikes]);

    const onCommentHandler = (e, id) => {
        e.preventDefault();
        let data = {
            comment: comment,
            userId: storedData.userId
        }
        axios.post(`http://localhost:5000/posts/post-comment/${id}`, data)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    };

    const showCommentHandler = () => {
        setShowComments(prevState => !prevState);
    };
    
    let postsData = posts.map(post => {
        
        return <div key={post._id} className={styles.post}>
                    {
                        post.creator.map(i => {
                            return <div key={i._id}>
                                <NavLink to={`/user/${i.userId._id}`} className={styles.user__profile} key={post.creator._id}>
                                <img className={styles.user__profile__image} src={`http://localhost:5000/${i.userId.image}`} alt="user__image" />
                                <p>{i.userId.name}</p>
                                </NavLink>
                            </div>
                        })
                    }
                    <div className={styles.post__image__container}>
                        <img className={styles.post__image} src={`http://localhost:5000/${post.image}`} alt="image" />
                    </div>
                    <div className={styles.post__social}>
                
                        <input name="comments" type="text" 
                        className={styles.comments}
                        placeholder="Add a comment..."
                        onChange={e => setComment(e.target.value)}
                        />
                        <a href="" className={styles.add} 
                        onClick={(e) => onCommentHandler(e, post._id)}>post</a>
                    </div>
                    <div className={styles.links}>
                        <p style={{marginTop: '1rem'}}>Likes: {post.likesCount}</p>
                        <ul>
                            <li>
                                <NavLink to="/" onClick={showCommentHandler}>
                                    comments
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/post/${post._id}`}>View</NavLink>
                            </li>
                            <li>  
                                {
                                    post.likes && post.likes.map(i => {
                                        return <div key={i._id}>
                                            <NavLink key={i._id} to="/" 
                                                onClick={() => {i.userId === storedData.userId ? 
                                                decLikes(post._id) : 
                                                incLikes(post._id)}
                                            }>
                                                {i.userId === storedData.userId ? 'Dislike' : 'Like'}
                                            </NavLink>
                                        </div>
                                    })
                                }
                                {post.likes.length === 0 && <NavLink to="/" onClick={() => incLikes(post._id)}>Like</NavLink>}
                            </li>
                            <li>  
                                <NavLink to="/" >
                                    Share
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    {showComments && <Comments id={post._id} 
                        commentShow={showCommentHandler}/>
                    }      
        </div>; 
    });

    return (
        <div className={styles.row}>
            <div className={styles.posts}>
                {postsData}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.userId
    }
};

export default connect(mapStateToProps, null)(Posts);
