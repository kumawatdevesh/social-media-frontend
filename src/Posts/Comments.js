import React, { useEffect, useState } from 'react';
import styles from './Comments.module.css';

function Comments(props) {

    const [comm, setComm] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/posts/comments/${props.id}`);
            const responseData = response.json();
            responseData.then(res => {
                console.log(res);
                setComm(res.comm);  
            })
            .catch(err => {
                console.log(err);
            });
        };  
        fetchData();
    }, [props.id]); 

    let data;
    if(comm.length > 0) {
        data = comm.map((cm, index) => {
            return (
                <div className={styles.comment__content__user} key={index}>
                    <p>{cm.comment}</p>
                    <p>{cm.name}</p>
                </div>
            )
        });
    }

    return (
        <div className={styles.comments}>
            <div className={styles.comment__content}>
                {data}
            </div>
            <button onClick={props.commentShow} className={styles.cancel}>Cancel</button>
        </div>
    );
}

export default Comments;
