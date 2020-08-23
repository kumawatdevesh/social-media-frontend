import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import NavLinks from './NavLinks';
import styles from './MainHeader.module.css';

function MainHeader(props) {

    const home = () => {
        props.history.push('/');
    };

    return (
        <div className={styles.row}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <div className={styles.hamburger} onClick={home}>
                        <div className={styles.hamburger__line}></div>
                        <div className={styles.hamburger__line}></div>
                        <div className={styles.hamburger__line}></div>
                    </div>
                </div>
                <NavLinks />
            </div>
        </div>
    )
}

export default withRouter(MainHeader);
