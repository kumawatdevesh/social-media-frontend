import React, {useEffect} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';   
import styles from './NavLinks.module.css';

function NavLinks(props) {

    const logout = () => {
        props.logout();
    };  

    const storedData = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => {
        if(storedData && storedData.userToken && 
            new Date(storedData.timeUp) > new Date()
        ) {
            props.login(storedData.userId, storedData.userToken, 
                new Date(storedData.timeUp)
            );
        }
    }, [props.login]);
    
    let clearTimer;

    useEffect(() => {
        if(props.userToken && props.timeUp) {
            const remTime = props.timeUp - new Date(new Date().getTime());
            clearTimer = setTimeout(props.logout, remTime);
        }else {
            clearTimeout(clearTimer);
        }
    }, [props.timeUp, props.logout]);
    
    return (
        <div className={styles.nav}>

            {!props.userToken &&
                <NavLink to="/auth" className={styles.nav__links}>Auth</NavLink>
            }
            {props.userToken &&
                <NavLink to="/people" className={styles.nav__links}>Search</NavLink>
            }
            {props.userToken &&
                <NavLink to={`/friends/${props.userId}`} className={styles.nav__links}>Friends</NavLink>
            }
            {props.userToken &&
                <NavLink to={`/profile/${props.userId}`} className={styles.nav__links}>Profile</NavLink>
            }
            {props.userToken &&
                <NavLink to="/auth" onClick={logout} 
                className={styles.nav__links}>Logout</NavLink>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.userId,
        userToken: state.userToken,
        timeUp: state.timeUp
    }
};

const mapDispatchToProps = dispatch => {
    return {
        login: (id, token, time) => dispatch({type: 'login', userId: id, userToken: token, timeUp: time}),
        logout: () => dispatch({type: 'logout'})
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavLinks));
