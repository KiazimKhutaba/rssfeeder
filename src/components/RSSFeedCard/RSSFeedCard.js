import React from 'react';
import 'bootstrap/dist/css/bootstrap';
import { IconShare } from "../../config/icons";

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

    const openLink = (url) => {
        let a = document.createElement('a');
        a.target= '_blank';
        a.href= url;
        a.click();
    }

    const onShareIconClick = (e) => {

        const link = e.target.dataset.link;
        const title = e.target.dataset.title;

        console.log('link: ',link, 'title: ', title);

        const httpRef = `https://telegram.me/share/url?url=${link}&text=${title}`;
        openLink(httpRef);
        //window.open(httpRef, '_blank');
    }


    return (
        <div className={"card h-100 " + themeClass} key={"_card_" + id}>
            <IconShare
                styled={styles.shareIcon}
                width={20}
                height={20}
                link={href}
                title={title}
                onClick={onShareIconClick}
            />
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