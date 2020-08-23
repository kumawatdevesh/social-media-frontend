import React, { useState } from 'react';
import Modal from '../UI/Modal';
import styles from './AddPost.module.css';
import axios from 'axios';

function AddPost(props) {

    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    const [previewImage, setPreviewImage] = useState();

    let modal = <Modal />;

    const onPostSubmitHandler = (e) => {
        e.preventDefault();
        const storedData = JSON.parse(localStorage.getItem('userData'));

        const formData = new FormData();
        formData.append('image', image);
        formData.append('caption', caption);
        formData.append('creator', storedData.userId);
        
        fetch('http://localhost:5000/posts/post', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log(res.msg);
        })
        .catch(err => {
            console.log(err);
        });
        modal = null;
        props.history.push('/');
    };  

    const fileUploadHandler = (e) => {
        const url = e.target.files[0];
        setImage(url);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(url);
        fileReader.onload = () => {
            setPreviewImage(fileReader.result);
        };
    };

    return (
        <div className={styles.row}>
            <div className={styles.post}>
                <form className={styles.post__form}>

                    <label htmlFor="image">Image</label>
                    <input 
                    type="file" 
                    name="image"
                    onChange={fileUploadHandler}
                    />

                    <img src={previewImage} className={styles.previewImage}/>

                    <label htmlFor="caption">Caption</label>
                    <input 
                    type="text" 
                    name="caption"
                    value={caption}
                    onChange={e => setCaption(e.target.value)}
                    />

                    <input type="submit" value="post" onClick={onPostSubmitHandler}/>
                </form> 
                {modal}          
            </div>
        </div>
    )
}

export default AddPost;
