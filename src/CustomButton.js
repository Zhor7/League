import React from 'react';
import './CustomButton.scss';

const CButton = (props) => {
    return(
        <button className="CButton" type={props.type} value={props.value} onClick={props.onClick} style={props.style}>{props.children}</button>
    )
};

export default CButton;