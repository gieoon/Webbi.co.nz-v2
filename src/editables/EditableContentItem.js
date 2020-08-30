import React from 'react';
import './EditableContentItem.scss';

export default function EditableContentItem({
    content,
    currentStyleIndex,
}){
    return (
        <div className={"EditableContentItem _" + currentStyleIndex}>
            <span className="title">{content.name}</span>
            <img src={handleImgSrc(content.imgUrl)} alt="" />
            <span className="date">{content.date}</span>
            <span className="price">{content.price}</span>
            <span className="description">{content.text}</span>
        </div>
    )
}

// Drive URL's need to be updated to an alternate address to work.
// In the future, this needs to cater to 'Insert in Cell' data.
const handleImgSrc = (imgUrl) => {
    // Update Drive URL to a separate one on display
    if(imgUrl.includes('https://drive.google.com/file/d/')){
        // Extract fileId from URL
        const regex = /(?<=d\/)(.*)(?=\/view)/;
        var fileIds = imgUrl.match(regex);
        if(!fileIds.length) return imgUrl;
        var fileId = fileIds[0];
        var newUrl = "https://drive.google.com/uc?export=view&id=" + fileId;
        return newUrl;
    }
    return imgUrl;
}