import React from 'react';
import styles from './index.scss';
import { ReactSVG } from 'react-svg';

import logo from '../../static/logo.svg';

function Header(props) {
    return (
        <div className={styles['wrapper']}>
            <ReactSVG
                src={logo}
                beforeInjection={(svg) => {
                    svg.classList.add('svg-logo')
                    svg.setAttribute('style', 'height: 125px;')
                  }}/>
        </div>
    );
}

export default Header;