import React, {useEffect, useState} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './app.css';
import RSSFeeder from './RSSFeeder/RSSFeeder';
import DarkModeIcon from './icons/DarkModeIcon'
import LocalStorageDB from '../utils/LocalStorageDB' ;
import RSSChannelsCatalog from "../utils/RSSChannelsCatalog";
import AppConfig from '../config/config';


const App = () => {

    // App dependencies
    // Todo: when component re-renders - this objects created again and again
    const db = new LocalStorageDB(AppConfig.AppName);
    const channelsDB = new RSSChannelsCatalog(db);

    const [ darkMode, setDarkMode ]  = useState(db.fetch(AppConfig.KEY_DARK_MODE_ENABLED) || false);
    
    db.save(AppConfig.KEY_DARK_MODE_ENABLED, darkMode);


    const changeTheme = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div className={ darkMode ? "App container-fluid p-0 theme_dark_2": "App container-fluid p-0" }>

            <div className="change-theme-btn" onClick={changeTheme}>
                <DarkModeIcon/>
            </div>

            <RSSFeeder darkTheme={darkMode} channelsDB={channelsDB}/>
        </div>
    );
};

export default App;