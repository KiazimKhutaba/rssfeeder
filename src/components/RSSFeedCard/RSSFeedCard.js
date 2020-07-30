import React from 'react';
import 'bootstrap/dist/css/bootstrap';
import { IconShare } from '../icons/icons.js';
import AppConfig from "../../config/config.js";

// for example purpose
const styles = {
    cardHeader: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        marginBottom: '15px'
    },
    shareIcon: {
        position: 'absolute',
        top: '5px',
        right: '5px',
        cursor: 'pointer',
        fill: 'rgb(148, 150, 152)'
    }
}


const RSSFeedCard = ({ id, imageURL, pubDate, title, content, href, themeClass }) => {

    return (
        <div className={"card h-100 " + themeClass} key={"_card_" + id}>

            <a
                href={AppConfig.SHARE_TELEGRAM.format(href, title)}
                target="_blank"
                title={title}
            >
                <IconShare
                    styled={styles.shareIcon}
                    width={20}
                    height={20}
                />
            </a>

            { imageURL ?
                <img className="card-img-top" src={imageURL} alt={title} /> : 
                <div className="card-header">
                    <div className="card-title" style={styles.cardHeader}>#{id} {title}</div>
                </div>
            }

            <div className="card-body">
                { imageURL ? <div style={styles.cardHeader}>{title}</div> : '' }
                <div className="card-text">{content}</div>
            </div>

            <div className="card-footer d-flex">
                <span className="text-left text-secondary mt-1">{ pubDate }</span>
                <a href={href} className="btn btn-sm btn-success text-white ml-auto" target="_blank">Читать</a>
            </div>

        </div>
    );
};

export default RSSFeedCard;