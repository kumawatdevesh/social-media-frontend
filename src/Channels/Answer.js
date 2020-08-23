import React, {useState} from 'react';
import styles from './Answer.module.css';

function Answer(props) {  
    const [answer, setAnswer] = useState('');

    const storedData = JSON.parse(localStorage.getItem('userData'));

    const onAnswerHandler = (e, qid) => {
        e.preventDefault();

        const data = {
            answer: answer,
            userId: storedData.userId,
            quesId: qid
        }
        fetch(`http://localhost:5000/channels/post-answer/${props.cid}`, {
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
        });
    };

    return (
        <div>
            <div className={styles.answer}>
                <form className={styles.answer__form} onSubmit={(e) => onAnswerHandler(e, props.quesId)}>
                    <textarea className={styles.story} name="story" onChange={e => setAnswer(e.target.value)} />
                    <input type="submit" className={styles.submit} />
                </form>
            </div>
        </div>
    )
}

export default Answer;
