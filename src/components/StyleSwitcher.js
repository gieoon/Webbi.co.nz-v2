import React from 'react';
import {ChevronLeft, ChevronRight} from 'react-feather';

export default function StyleSwitcher({
    currentStyleIndex,
    setCurrentStyleIndex,
    numberOfStyles,
}){
    const reduceStyle = () => {
        console.log("reduce style: ", currentStyleIndex);
        if(currentStyleIndex === 0){
            setCurrentStyleIndex(numberOfStyles-1);
        } else {
            setCurrentStyleIndex(currentStyleIndex - 1);
        }
    }

    const addStyle = () => {
        if(currentStyleIndex === numberOfStyles-1){
            setCurrentStyleIndex(0);
        } else {
            setCurrentStyleIndex(currentStyleIndex + 1);
        }
    }

    return(
        <>
            <ChevronLeft onClick={()=>{reduceStyle()}} />
            <ChevronRight onClick={()=>{addStyle()}} />
        </>
    )
}
