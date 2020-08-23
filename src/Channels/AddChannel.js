import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import styles from './AddChannel.module.css';

function AddChannel() {

    const [channel, setChannel] = useState('');
    const [cat, setCat] = useState('');
    const userId = useParams().id;

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data = {
            name: channel,
            cat: cat
        }
        console.log(data);
        const storedData = JSON.parse(localStorage.getItem('userData'));

        fetch(`http://localhost:5000/channels/channel/${storedData.userId}`, {
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
        <div className={styles.row}>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={onSubmitHandler}>
                    <label htmlFor="name">Channel Name</label>
                    <input type="text" placeholder="enter channel name" 
                    value={channel}
                    onChange={e => setChannel(e.target.value)} />

                    <label htmlFor="name">Field</label>
                    <select name="category" id="category" className={styles.select} 
                    value={cat}
                    onChange={e => setCat(e.target.value)}>
                        <option value="politics">politics</option>
                        <option value="sports">sports</option>
                        <option value="films">films</option>
                        <option value="business">business</option>
                    </select>

                    <input type="submit" value="create" />
                </form>
            </div>
        </div>
    )
}

export default AddChannel;
