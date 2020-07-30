import React, { useState, useEffect } from 'react'
import RSSParser from 'rss-parser/lib/parser'
import unescape from 'lodash/unescape'

import './RSSFeeder.css';
import RSSFeedCard from '../RSSFeedCard/RSSFeedCard';
import NewRSSChannelModal from '../NewRSSChannelModal/NewRSSChannelModal';
import ListChannelModal from '../ListChannelModal/ListChannelModal';

import LocalStorageDB from '../../utils/LocalStorageDB';
import RSSChannelsCatalog from "../../utils/RSSChannelsCatalog";

import { isEmpty } from '../../utils';
import '../../utils/extenstions';
import AppConfig from '../../config/config';
import RSSChannels from "../../data/default-channels";



const RSSFeeder = ({ darkTheme }) => {
    
    const [ isLoading, setIsLoading ] = useState(false);
    const [ url, setURL ] = useState('');

    const [ feedError, setFeedError ] = useState('');
    const [ feedItems, setFeedItems ] = useState([]);
    const [ feedTitle, setFeedTitle ] = useState('');
    const [ modalVisible, setModalVisibility ] = useState(false);
    const [ channelsModal, displayChannelsList ] = useState(false);
    const [ channels, setChannels ] = useState([]);
    const [ channelsAdded, setChannelsAdded ] = useState(false);
    const [ channelRemoved, setChannelRemoved ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState('');
    

    const handleQuery = e => setURL(e.target.value.trim());
   

    const db = new LocalStorageDB(AppConfig.appName);
    const channelsDB = new RSSChannelsCatalog(db);


    useEffect(() => {

        let _channels = channelsDB.fetchAllSorted();

        if( _channels.length === 0 ) {
            setChannels(RSSChannels);
        }
        else {
            setChannels(_channels);
        }


    }, [channelsAdded, channelRemoved]);


    const fetchFeeds = (channelUrl) => {
       
        const CORS_PROXY = AppConfig.CORS_PROXY;
        const baseUrl    = CORS_PROXY + channelUrl;
        const parser     = new RSSParser();
        
        parser
            .parseURL(baseUrl)
            .then(
				feed => {
                    setFeedError('');
					setFeedTitle(feed.title);
					setFeedItems(feed.items);
					setIsLoading(false);
				},
				err => {
					setFeedError(err.message);
                    setIsLoading(false);
				}

			)
			.catch(err => {
					setFeedError(err.message)
			})
            // .finally(() => console.info("Fetching finished!"));
    };


    const handleSearch = () => {

        if( url.length === 0 ) {
            alert("Please, choose rss channel from dropdown below!");
            return;
        }

        fetchFeeds(url);
        setIsLoading(true);
    }


    const onChannelAdded = () => {
        setChannelsAdded(!channelsAdded)
    }


    const handleFeedSearch = (e) => {

        const searchText = e.target.value.trim().toLowerCase();

        if( searchText.length === 0 ) {
            fetchFeeds(url)
        }


        const filteredFeedItems = feedItems.filter(item => {

            return (
                item.title.toLowerCase().includes(searchText) ||
                item.contentSnippet.toLowerCase().includes(searchText)
            )

        });

        setFeedItems(filteredFeedItems);
        console.log(feedItems.length);
    }



    return (
        <div className="rss-wrapper">
 
            <div className={darkTheme ? "text-center bg-light mb-3 p-3 rss-feeder theme_dark-box" : "text-center bg-light mb-3 p-3 rss-feeder" }  >
            
                {/* Title */}
                <div className="rss-feeder__header">
                    <div className="rss-feeder__header-title">
                        <h1>RSSFeeder</h1>
                        <p>Выберите тематику</p>

                        <select className="form-control" style={{width: "50%", margin: "1px auto"}} onChange={handleQuery}>
                            {!isEmpty(channels) && channels.map((channel,index) => (
                                <option value={channel.url} key={'url_' + index}>
                                    {channel.title}
                                </option>
                            ))}
                        </select>
                        
                        <br/>

                        <button className="btn btn-primary pl-4 pr-4" style={{marginTop: "15px"}} onClick={handleSearch}>
                            { isLoading ? "Загрузка..." : "Поиск" }
                        </button>

                        <button className="btn btn-info pl-4 pr-4 mt-3 ml-3" onClick={() => {
                            setModalVisibility(!modalVisible);
                        }}>
                            Новый канал
                        </button>

                        <button className="btn btn-success pl-4 pr-4 mt-3 ml-3" onClick={() => {
                            displayChannelsList(!channelsModal);
                        }}>
                            Каналы
                        </button>
                    </div>
                </div>

            </div>

            { modalVisible && 
                <NewRSSChannelModal 
                    modalVisible={modalVisible} 
                    visibilityHandler={setModalVisibility} 
                    onChannelAdded={onChannelAdded} /> }

            { channelsModal && 
                <ListChannelModal 
                    modalVisible={channelsModal} 
                    visibilityHandler={displayChannelsList}
                    onChannelAdded={onChannelAdded}
                    onChannelRemoved={(r) => {
                        setChannelRemoved(!channelRemoved);
                    }} /> 
            }

            { feedError && <div className="alert alert-danger m-3">{ feedError }</div> }

            { feedTitle &&
                <div className="feeds-search">
                    <div className="alert p-2 alert-success col-lg-6 pl-4" >{ feedTitle } ({feedItems.length})</div>
                    <div className="feeds-search__input col-lg-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Input your search term here..."
                            onChange={handleFeedSearch}
                        />
                    </div>
                </div>
            }

            <div className="row-wrap p-3">
                {   !isEmpty(feedItems) && 
                    feedItems.map((item,index) => (
                    <div className="news-row__column" key={"col_" + index}>
                        <RSSFeedCard 
                            key={'card_' + index} 
                            id={++index}
                            imageURL={item.enclosure ? item.enclosure.url : ''}
                            title={item.title} 
                            content={unescape(item.contentSnippet).trim().substring(0,500)} 
                            href={item.link} 
                            pubDate={item.pubDate.substring(-5, item.pubDate.length - 5)}
                            themeClass={darkTheme ? 'theme_dark-box' : ''}
                        />
                    </div>
                ))}
            </div>
        </div>
        
    );
};


export default RSSFeeder;