import React, { useEffect, useState, createContext } from 'react';
import {useParams, NavLink, withRouter} from 'react-router-dom';
import styles from './Questions.module.css';
import Answer from './Answer';

function Questions(props) {
    const [channelInfo, setChannelInfo] = useState([]);
    const [question, setQuestion] = useState([]);
    const [postAnswer, setPostAnswer] = useState(false);
    const [follow, setFollow] = useState(false);
    const [quesId, setQuesId] = useState('');

    const channelId = useParams().cid;
    const storedData = JSON.parse(localStorage.getItem('userData'));
    
    useEffect(() => {
        fetch(`http://localhost:5000/channels/channel/${channelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            setChannelInfo([...channelInfo, res.channel])
        })
        .catch(err => {
            console.log(err);
        })
    }, [channelId]);

    const postAnswerHandler = (id) => {
        setQuesId(id);
        setPostAnswer(prevState => !prevState);
    };

    useEffect(() => {
        fetch(`http://localhost:5000/channels/que-ans/${channelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            res.question.map(i => {
                setQuestion(...question, i.content);
            })
        })
        .catch(err => {
            console.log(err);
        });

    }, [channelId]);

    const followChannel = () => {
        const data = {
            userId: storedData.userId
        }
        fetch(`http://localhost:5000/channels/follow/${channelId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            console.log(res);
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        fetch(`http://localhost:5000/channels/follow/${storedData.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
            setFollow(res.following);
        })
        .catch(err => {
            console.log(err);
        });
    }, [channelId, storedData.userId]);

    let info;

    if(channelInfo.length > 0) {
        info = channelInfo.map(i => {
            return <div className={styles.top} key={i._id}>
                <div className={styles.channel__info}>
                    <p style={{fontSize: '2rem', fontWeight: 'bold'}}>{i.name}</p>
                    <p>members: {i.subscribers.length}</p>
                </div>
                <div className={styles.channel__links}>
                    <NavLink to={`/${i._id}/ask-question`}>Ask</NavLink>
                    <button className={styles.follow} onClick={() => followChannel}>
                        {follow ? 'Following' : 'Follow'}
                    </button>
                </div>
            </div>
        })
    }

    let ques;

    if(question.length > 0) {
        ques = question.map((i, index) => {
            return <div className={styles.ques__section} key={index}>
                <NavLink to={`/question/${i.question._id}`} className={styles.ques}>{i.question.title}</NavLink>
                <NavLink to={`/channels/${channelId}`} className={styles.ask} onClick={() => postAnswerHandler(i.question._id)}>Answer</NavLink>
                {postAnswer && <Answer quesId={quesId} cid={channelId} />}
            </div>
        })
    }

    return (
        <div className={styles.row}>
            <div className={styles.container}>
                {info}
                {ques}
            </div>
        </div>
    )
}

export default withRouter(Questions);
