import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import LocalStorageDB from '../../utils/LocalStorageDB';
import RSSChannelsCatalog from '../../utils/RSSChannelsCatalog';
import { isEmpty, downloadFile } from '../../utils';
import AppConfig from '../../config/config';



const ListChannelModal = ({ modalVisible, visibilityHandler, onChannelRemoved, onChannelAdded }) => {

    const [ channels, setChannels ] = useState([]);
    const [ channelRemoved, setChannelRemoved ] = useState(false);
    const [ channelsAdded, setChannelsAdded ] = useState(false);
    
    const db = new LocalStorageDB(AppConfig.appName);
    const channelsDB = new RSSChannelsCatalog(db);


    useEffect(() => {
        
        let channels = channelsDB.fetchAllSorted();

        setChannels(channels);

        //console.log("useEffet: channelRemoved changed!")

    }, [channelRemoved, channelsAdded]);



    const exportFeeds = () => {
        let channels = channelsDB.fetchAll();

        if( !channels ) return;

        let _channels = channels.reduce(( str, channel ) => {
            return str + channel.title + ';' + channel.url + '\r\n'
        }, '');

        //console.log(_channels);

        downloadFile(_channels, `channels_${Date.now()}.txt`);
    }


    const downloadFeeds = (e) => {
        
      if (window.FileList && window.File) {

            const file = e.target.files[0];

            const name = file.name ? file.name : 'NOT SUPPORTED';
            const type = file.type ? file.type : 'NOT SUPPORTED';
            const size = file.size ? file.size : 'NOT SUPPORTED';
            
            let r =  { name, type, size };

            console.log(r)


            const reader = new FileReader();

            reader.addEventListener('load', event => {
                
                let content = event.target.result;

                let rows = content.split('\r\n');
                let feeds = [];

                for( const row of rows ) 
                {
                    let [ title, url ] = row.split(';')

                    if( !url || !title ) continue;

                    feeds.push( { title, url } )
                }

                console.log(feeds);

                channelsDB.importRSS(feeds);
                setChannelsAdded(!channelsAdded);
                
                onChannelAdded();
                
            });

            reader.readAsText(file);
        }
    }


    const handleClose = () => visibilityHandler(false);


    const removeChannel = (e) => {
        const channelId = e.target.dataset.id;

        let r = channelsDB.removeChannel(channelId);
        
        onChannelRemoved(r);
        setChannelRemoved(!channelRemoved);
    }


    return (
        <>
            <Modal 
                show={modalVisible} 
                onHide={handleClose} 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                scrollable
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Список каналов</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Идентификатор</th>
                                    <th>Название</th>
                                    <th>URL канала</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {   !isEmpty(channels) && 
                                    channels.map((item, index) => (
                                    <tr key={'lsm_' + index}>
                                        <td>{++index}</td>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.url}</td>
                                        <td>
                                            <Button 
                                                variant="danger"
                                                data-id={item.id}
                                                onClick={removeChannel}>
                                                Удалить
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Отмена
                        </Button>

                        <label htmlFor="rss-feeds-export" className="btn btn-md btn-success">Импорт RSS</label>
                        <input 
                            type="file" 
                            id="rss-feeds-export" 
                            style={{  zIndex: -1, opacity: 1, position: "absolute" }}
                            onChange={downloadFeeds}
                        />

                        <Button variant="primary" onClick={exportFeeds}>
                            Экспортировать
                        </Button>
                    </Modal.Footer>
            </Modal>
        </>
    );
};

export default ListChannelModal;