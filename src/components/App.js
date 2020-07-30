import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap';
import './app.css';
import RSSFeeder from './RSSFeeder/RSSFeeder';
import LocalStorageDB from '../utils/LocalStorageDB' ;
import AppConfig from '../config/config';




const App = () => {

    const KEY_DARK_MODE_ENABLED = 'isDarkModeEnabled';
    const db = new LocalStorageDB(AppConfig.appName);

    /*window.KEY_DARK_MODE_ENABLED = KEY_DARK_MODE_ENABLED;
    window.db = db;*/

    const [ darkMode, setDarkMode ]  = useState(db.fetch(KEY_DARK_MODE_ENABLED) || false);
    
    db.save(KEY_DARK_MODE_ENABLED, darkMode);


    const changeTheme = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div className={ darkMode ? "container-fluid p-0 theme_dark_2": "container-fluid p-0" }>

            <div className="change-theme-btn" onClick={changeTheme}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="moon" className="svg-inline--fa fa-moon fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"/>
                </svg>
            </div>

            <RSSFeeder darkTheme={darkMode}/>
        </div>
    );
};

export default App;