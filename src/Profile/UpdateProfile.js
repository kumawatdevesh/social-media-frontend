import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './UpdateProfile.module.css';

function UpdateProfile() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();

    const userId = useParams().id;

    useEffect(() => {

        fetch(`http://localhost:5000/auth/userdetails/${userId}`)
        .then(res => {
            return res.json();
        })
        .then(res => {
            setName(res.user.name);
            setEmail(res.user.email);
        })
        .catch(err => {
            console.log(err);
        })
    }, [userId])

    const onUpdateHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', file);

        fetch(`http://localhost:5000/auth/update-profile/${userId}`, {
            method: 'PUT',
            body: formData
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    };

    const imageHandler = (e) => {
        const filename = e.target.files[0];
        setFile(filename);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(filename);
        fileReader.onload = () => {
            setPreview(fileReader.result);
        }
    };

    return (
        <div className={styles.row}>
            <div className={styles.wrapper}>
            <form onSubmit={onUpdateHandler} className={styles.update__profile}>

                <label htmlFor="name">Name</label>
                <input type="text" placeholder="enter name" 
                value={name}
                name="name" onChange={e => setName(e.target.value)}/>

                <label htmlFor="email">Email</label>
                <input type="text" placeholder="enter email" 
                value={email}
                name="email" onChange={e => setEmail(e.target.value)}/>

                {preview && <img src={preview} alt="image" />}

                <label htmlFor="image">Image</label>
                <input type="file" name="image" onChange={imageHandler}/>

                <input type="submit" value="update" />

                </form>
            </div>
        </div>
    )
}

export default UpdateProfile;
