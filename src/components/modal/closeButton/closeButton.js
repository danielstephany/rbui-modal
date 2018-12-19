import React from 'react';
import PropTypes from 'prop-types';
import "./closeButton.scss"

export default function CloseButton(props) {
    return(
        <button className="close-modal-button" type="button" aria-label="close" onClick={props.closeModal}></button>
    );
}

CloseButton.propTypes = {
    closeModal: PropTypes.func.isRequired
}