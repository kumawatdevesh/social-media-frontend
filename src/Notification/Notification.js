import React from 'react';
import styles from './Notification.module.css';
 
function Notification(props) {
    return (
        <div className={styles.row}>
            <div className={styles.not}>
                <p>{props.request}</p>
            </div>
        </div>
    )
}

export default Notification;
