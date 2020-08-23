import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import styles from './Post.module.css';

function Post() {

    const postId = useParams().id;
    const [items, setItems] = useState([]);
    const [comm, setComm] = useState([]);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5000/posts/post/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            setItems([...items, res.post]);
        })
        .catch(err => {
            console.log(err);
        });
    }, [postId]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/posts/comments/${postId}`);
            const responseData = response.json();
            responseData.then(res => {
                setComm(res.comm);  
                setLikes(res.likes);
            })
            .catch(err => {
                console.log(err);
            });
        };  
        fetchData();
    }, [postId]); 

    let post;
    
    if(items.length > 0) {
        post = items.map(item => {
            return (
                <div className={styles.post} key={item._id}>
                    <img src={`http://localhost:5000/${item.image}`} alt="post image" />
                    <h3>{item.caption}</h3>
                    <p>Likes: {likes}</p>
                </div>
            )
        });
    }

    return (
        <div className={styles.row}>
            <div className={styles.posts}>
                {post}
                {
                    comm.map((i, index) => {
                        return (
                            <div className={styles.comments} key={index}>
                                <p>{i.comment}</p>
                                <p>{i.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Post;
