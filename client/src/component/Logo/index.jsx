import React from 'react';
import { ReactSVG } from 'react-svg';

import logo from '../../static/logo.svg';

import styles from './index.scss';

function Header(props) {
    return (
        <div className={styles.wrapper}>
            <ReactSVG
                src={logo}
                beforeInjection={(svg) => {
                    svg.classList.add('svg-logo')
                    svg.setAttribute('style', 'height: 125px; width: 250px')
                  }}/>
        </div>
    );
}

export default Header;