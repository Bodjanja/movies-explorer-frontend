import React from "react";
import "./MoviesCardList.css";

export default function MoviesCardList({component: Component, ...props}) {
    return(
        <ul className='movies-list'>
            {props.children}
        </ul>
    )
}