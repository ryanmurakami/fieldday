import React from 'react';
import 'grd';
import styles from './index.scss';

import { Link } from "react-router-dom";
import Logo from '../Logo/index.jsx';

function Header(props) {
    return (
        <header className={styles['header']}>
            <div className='container Grid -middle'>
                <div class="Cell -3of12">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <div class="Cell -3of12">
                    <Link to="/events">Events</Link>
                </div>
                <div class="Cell -3of12">
                    <Link to="/competitors">Competitors</Link>
                </div>
                <div class="Cell -3of12">
                    <Link to="/settings">Settings</Link>
                </div>
            </div> 
        </header>
    );
}

export default Header;