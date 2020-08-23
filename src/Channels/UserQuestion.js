import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import styles from './UserQuestion.module.css';

function UserQuestion() {

    const [question, setQuestion] = useState('');
    const qid = useParams().qid;
    const storedData = JSON.parse(localStorage.getItem('userData'));

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data = {
            question: question,
            userId: storedData.userId
        }
        fetch(`http://localhost:5000/channels/post-question/${qid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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

    return (
        <div className={styles.user__question}>
            <form className={styles.question__form} onSubmit={onSubmitHandler}>
                <input type="text" placeholder="write your question here!!!" onChange={e => setQuestion(e.target.value)}/>
                <input type="submit" />
            </form>
        </div>
    )
}

export default UserQuestion;   
