import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RSSParser from 'rss-parser/lib/parser';
import AppConfig from '../../config/config';
import '../../utils/extenstions'


const NewRSSChannelModal = ({ modalVisible, visibilityHandler, rssCatalog, onChannelAdded }) => {

    const [show, setShow] = useState(false);
    const [feedTitle, setFeedTitle] = useState('');
    const [feedURL, setFeedURL] = useState('');
    const [feedTitleIsLoading, setFeedTitleIsLoading] = useState(false);

    const handleClose = () => visibilityHandler(false);


    const fetchFeedTitle = (channelUrl, callbackOk, callbackError) => {

        const CORS_PROXY = AppConfig.CORS_PROXY;
        const baseUrl    = CORS_PROXY + channelUrl;
        const parser     = new RSSParser();

        parser
            .parseURL(baseUrl)
            .then(feed => callbackOk(feed.title))
            .catch(err => callbackError(err));
    }


    const preloadFeedTitle = (e) => {
        // Todo: direct access to DOM element - should be changed to ref
        let url = document.querySelector('#ChannelURL').value.trim();
        
        setFeedTitleIsLoading(true);

        if(url.length > 0) 
        {
            fetchFeedTitle( 
                url, 
                title => {
                    setFeedTitle(title);
                    setFeedTitleIsLoading(false);
                },
                error => {
                    setFeedTitleIsLoading(false);
                    alert(error);
                }
            );
        
        } else {
            setFeedTitleIsLoading(false);
            alert("URL can't be empty!");
        }

            
    }


    const newChannelSave = (e) => {

        let channel = {
            // Todo: direct access to DOM element - should be changed to ref
            title: document.querySelector('#ChannelName').value.trim(),
            url: document.querySelector('#ChannelURL').value.trim()
        }

        if( !channel.title || !channel.url ) {
            // Todo: change to error in state without alert
            alert('Channels data can\'t be empty!');
            return;
        }


        if( rssCatalog.containsChannel(channel.url) ) {
            handleClose();
        }
        else {

            if(rssCatalog.addChannel(channel)) {
                onChannelAdded()
                alert('Saved!');
            }
            else {
                alert('Error! Can\'t save channel!');
            }
        }

            

        handleClose();
    }


    const pasteRSSUrl = (e) => {
        
        if(navigator.clipboard)
        {
            navigator.clipboard
                .readText()
                .then(text => {
                    if( /http(s?):\/\/.*/.test(text) ) setFeedURL(text)
                })
        } 
    }


    return (
        <>
            <Modal 
                show={modalVisible} 
                onHide={handleClose} 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter">

                <Modal.Header closeButton>
                    <Modal.Title>Новый канал</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form>
                        <Form.Group controlId="ChannelName">
                            <Form.Label>Название канала</Form.Label>
                            <Form.Control 
                                type="text"
                                defaultValue={feedTitle}
                                placeholder="Введите название канала..." 
                                required />
                        </Form.Group>

                        <Form.Group controlId="ChannelURL">
                            <Form.Label>URL-адрес канала</Form.Label>
                            <Form.Control 
                                type="url" 
                                placeholder="Введите URL-адрес..."
                                pattern="http(s?)://.*"
                                defaultValue={feedURL}
                                onFocus={pasteRSSUrl}
                                required />

                                <Button 
                                    variant="outline-success mt-1" 
                                    size='sm' 
                                    onClick={preloadFeedTitle}>
                                    {feedTitleIsLoading ? 'Загружаем...' : 'Загрузить заголовок'}
                                </Button>

                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Отмена
                            </Button>
                            <Button type="submit" variant="primary" onClick={newChannelSave}>
                                Добавить
                            </Button>
                        </Modal.Footer>

                    </Form>
                    
                </Modal.Body>

                
            </Modal>
        </>
    );
}

export default NewRSSChannelModal;