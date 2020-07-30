import React from 'react';

export const IconTrash = () => {
    return (
        <svg
            style={{color: "white"}}
            aria-hidden="true" 
            focusable="false" 
            data-prefix="fas" 
            data-icon="trash" 
            className="svg-inline--fa fa-trash fa-w-14" 
            role="img" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 448 512">
                <path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/>
        </svg>
    )
};

export const IconShare = ({ styled, width, height, link, title, onClick }) => {

    return (
        <svg style={styled}
             fill="#000000"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             width={width}
             height={height}
             data-link={link}
             data-title={title}
             onClick={onClick}
        >
            <path d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z"/>
        </svg>
    )
}


