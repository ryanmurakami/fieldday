import React from 'react';
import '../../static/loading-bar.min.css';
import '../../static/loading-bar.min.js';

import './overwrite.css';
import styles from './index.scss';

function Loader({ progress }) {
    return (
        <div>
            <div 
                className="ldBar" 
                data-value={progress}
                style={{width: '75%', height: '36px'}}></div>
            <div>{progress}</div>
        </div>
    );
}

export default Loader;