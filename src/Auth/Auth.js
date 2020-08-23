import React, { useState } from 'react';
import axios from 'axios';
import styles from './Auth.module.css';
import {GoogleLogin} from 'react-google-login';
import { connect } from 'react-redux';

function Auth(props) {
    
    const [loginMode, swithLoginMode] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState();
    const [previewImage, setPreviewImage] = useState();

    const onAuthChangeHandler = () => {
        swithLoginMode(prevState => !prevState);
    };

    const loginHandler = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }

        axios.post('http://localhost:5000/auth/login', data, {
            method: 'POST'
        })
        .then(res => {
            props.login(res.data.user._id, res.data.userToken);
            props.history.push('/');
        })
        .catch(err => {
            console.log(err);
        });
    };  

    const signupHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('email', email);
        formData.append('password', password); 

        axios.post('http://localhost:5000/auth/signup', formData, {
            method: 'POST'
        })
        .then(res => {
            props.login(res.data.userId, res.data.userToken);
            props.history.push('/');
        })
        .catch(err => {
            console.log(err);
        });
    };

    const imageHandler = (e) => {
        const image = e.target.files[0];
        setImage(image);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
        fileReader.onload = function() {
            setPreviewImage(fileReader.result);
        }
    };

    const responseGoogle = (response) => {
        console.log(response.profileObj.email);
        console.log(response.profileObj.familyName);
        console.log(response.profileObj.givenName);
    }

    return (
        <div className={styles.row}>
            <div className={styles.auth}>
                <form className={styles.auth__form}>
                    {!loginMode && <label htmlFor="name">Name</label>}
                    {!loginMode && 
                    <input name="name"
                    onChange={e => setName(e.target.value)} 
                    placeholder="enter name" type="text" 
                    value={name}/>
                    }

                    {!loginMode && <label htmlFor="image">Image</label>}
                    {!loginMode &&
                    <input 
                    type="file" 
                    name="image"
                    onChange={imageHandler}
                    />
                    }
                    {!loginMode && <img alt="preview" name="image" src={previewImage} />}

                    <label htmlFor="email">Email</label>
                    <input name="email"
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="enter email" type="email" 
                    value={email}/>

                    <label htmlFor="name">Password</label>
                    <input name="name"
                    onChange={e => setPassword(e.target.value)}  
                    placeholder="enter password" type="password" 
                    value={password}/>

                    <input type="submit"
                    value={loginMode ? 'Login' : 'Signup'}
                    onClick={loginMode ? loginHandler : signupHandler}
                    />
                </form>
                <button onClick={onAuthChangeHandler} className={styles.authHandler}>
                    {loginMode ? 'SignUp': 'Login'}
                </button>
                <div className={styles.google}>
                    <GoogleLogin
                        clientId="596359179192-iev9uk0s5qcl3v3tv1p3qnjg1bimtqtd.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.userId,
        userToken: state.userToken
    }
};

const mapDispatchToProps = dispatch => {
    return {
        login: (id, token) => dispatch({type: 'login', userId: id, userToken: token})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
// Xxsd7MgbBGb0ztwKVJGqc-VF 