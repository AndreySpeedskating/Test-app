import React from "react";

const Img = (props) => {
    return (
        <img src={props.src}
             id = {props.id}
             alt={props.alt}
             className={props.className}
             onClick={props.onClick}
        />
    )
}

export default Img