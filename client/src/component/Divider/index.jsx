import React from 'react';
import 'grd';
import styles from './index.scss';

function Divider(props) {
    return (
        <div className={`Grid ${styles.divider}`}>
            <div className="Cell -fill">
                <h3>{props.text}</h3>
                <hr />
            </div>
        </div>
    );
}

export default Divider;