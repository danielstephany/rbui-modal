import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './modal.scss';
import ModalInterface from './ModalInterface.js';

class Modal extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
            modalActive: false
        }

        this.modalClosed = true;
        this.transitionTime = (this.props.transitionTime !== "undefined" && this.props.transitionTime !== "number") ? this.props.transitionTime : 300;
    }

    componentDidMount = () => {
        this.toggleModal();
    }
    componentDidUpdate = () => {
        this.toggleModal();
    }

    componentWillUnmount = () => {
        this.modalToggleButton.removeEventListener('click', this.toggleModal); 
    }

    openModal = (resetFocusElement) => {
        this.setState({
            modalOpen: true,
            modalActive: true
        });
        if(typeof resetFocusElement === "object"){
            this.elementToFocusOnClose = resetFocusElement;
        }else if (typeof resetFocusElement === "string") {
            this.elementToFocusOnClose = document.getElementById(resetFocusElement);
        }
    }

    setClosingFocusElement = (resetFocusElement) => {
        if (typeof resetFocusElement === "object") {
            this.elementToFocusOnClose = resetFocusElement;
        } else if (typeof resetFocusElement === "string") {
            this.elementToFocusOnClose = document.getElementById(resetFocusElement);
        }
    }

    closeModal = () => {
        this.setState({ modalOpen: false, transitioning: true}, () => {
            setTimeout(()=>{
                this.setState({ modalActive: false, transitioning: false }, () => {
                    this.props.elementToFocusOnClose.focus();
                });
            }, this.transitionTime);
        });   
    }

    toggleModal = () => {
        if (!this.state.transitioning) {
            if (this.props.modalOpen && this.modalClosed) {
                this.modalClosed = false;
                this.openModal();
            } else if (!this.props.modalOpen && !this.modalClosed) {
                this.modalClosed = true;
                this.closeModal();
            }
        }
    }

    render = () => {
        return (
            <React.Fragment>
                {this.state.modalActive ? 
                    <ModalInterface
                        transitionTime={this.transitionTime}
                        closeButton={this.props.closeButton}
                        closeModal={this.props.handleClose} 
                        modalOpen={this.state.modalOpen} 
                        header={this.props.header} 
                        body={this.props.body} 
                        footer={this.props.footer}
                        children={this.props.children}
                        draggable={this.props.draggable}
                        containedInWindow={this.props.containedInWindow}
                        maxWidth={this.props.maxWidth}
                        /> 
                    : 
                    undefined}
            </React.Fragment>
        );
    }
}

Modal.propTypes = {
    toggleBtnRef: PropTypes.node,
    maxWidth: PropTypes.number,
    closeModale: PropTypes.func,
    modalOpen: PropTypes.bool.isRequired,
    elementToFocusOnClose: PropTypes.object
}

export default Modal;