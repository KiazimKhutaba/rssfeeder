
const AppConfig = {

    // App ID
    AppName: 'RSSFeederApp.v1.0',

    /* 'https://cors-anywhere.herokuapp.com/' */
    CORS_PROXY: 'https://rssfeeder2020.herokuapp.com/getrss.php?url=',

    // dark mode key name for local storage
    KEY_DARK_MODE_ENABLED: 'isDarkModeEnabled',

    // telegram share url
    SHARE_TELEGRAM: 'https://telegram.me/share/url?url={0}&text={1}'
}

export default AppConfig;