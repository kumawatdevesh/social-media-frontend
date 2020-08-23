import React, { useEffect, useState } from 'react';
import {useParams, NavLink} from 'react-router-dom';
import styles from './Answers.module.css';

function Answers() {

    const [ans, setAns] = useState([]);
    const [ques, setQues] = useState('');

    const quesId = useParams().quesId;

    useEffect(() => {
        fetch(`http://localhost:5000/channels/ans/${quesId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            setAns(...ans, res.ans);
            ans.push(res.user);
        })
        .catch(err => {
            console.log(err);
        });

    }, [quesId]);

    useEffect(() => {
        fetch(`http://localhost:5000/channels/ques/${quesId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            res.question.map(i => {
                setQues(i.title);
            });
        })
        .catch(err => {
            console.log(err);
        });

    }, [quesId]);


    let answer;

    if(ans.length > 0) {
        answer = ans.map((i, index) => {
            let name = Object.assign({}, i.user)[index].name;
            let id = Object.assign({}, i.user)[index]._id;
            return <div key={index} className={styles.answer}>
                <p>{i.answers.answer}</p> 
                <NavLink to={`/profile/${id}`}><p>{name}</p></NavLink>
            </div>
        });
    }

    return (
        <div className={styles.row}>
            <div className={styles.answer__content}>
                <div className={styles.question}>
                    <p>{ques}</p>
                </div>
                {answer}
            </div>
        </div>
    )
}

export default Answers;
