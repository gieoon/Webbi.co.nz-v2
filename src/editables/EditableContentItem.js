import React from 'react';
import './EditableContentItem.scss';
import {convertDriveURL} from '../utils/commonFunctions';

export default function EditableContentItem({
    content,
    currentStyleIndex,
}){
    return (
        <div className={"EditableContentItem _" + currentStyleIndex}>
            <span className="title">{content.name}</span>
            <img src={convertDriveURL(content.imgUrl)} alt="" />
            <span className="date">{content.date}</span>
            <span className="price">{content.price}</span>
            <span className="description">{content.text}</span>
        </div>
    )
}
