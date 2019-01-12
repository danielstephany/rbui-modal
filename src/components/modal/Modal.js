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
        // this update is used to prevent an infinate setState loop.
        this.modalClosed = true;
        this.transitionTime = (this.props.transitionTime !== "undefined" && this.props.transitionTime !== "number") ? this.props.transitionTime : 300;
    }

    componentDidMount = () => {
        this.modalToggleButton = document.getElementById(this.props.toggleBtnRef);
        this.modalToggleButton.addEventListener('click', this.toggleModal);
    }
    componentWillUnmount = () => {
        this.modalToggleButton.removeEventListener('click', this.toggleModal); 
    }

    openModal = (resetFocusElement) => {
        this.setState({
            modalOpen: true,
            modalActive: true
        }, ()=>{
            this.modalClosed = false;
        });
        if(typeof resetFocusElement === "object"){
            this.elementToFocusOnClose = resetFocusElement;
        }else if (typeof resetFocusElement === "string") {
            this.elementToFocusOnClose = document.getElementById(resetFocusElement);
        }
    }

    closeModal = () => {
        this.setState({ modalOpen: false}, ()=>{
            setTimeout(()=>{
                this.setState({ modalActive: false }, () => {
                    this.modalClosed = true;
                    this.elementToFocusOnClose.focus();
                });
            },400);
        });   
    }

    toggleModal = (event) => {
        if (!this.state.modalOpen && this.modalClosed) {
            this.openModal();
        } else if (this.state.modalOpen && !this.modalClosed) {
            this.closeModal();
        }
        if(typeof event === "object"){
            this.elementToFocusOnClose = event.target;
        }
    }

    render = () => {
        return (
            <React.Fragment>
                {this.state.modalActive ? 
                    <ModalInterface
                        transitionTime={this.transitionTime}
                        closeButton={this.props.closeButton}
                        closeModal={this.closeModal} 
                        modalOpen={this.state.modalOpen} 
                        header={this.props.header} 
                        body={this.props.body} 
                        footer={this.props.footer}
                        children={this.props.children}
                        draggable={this.props.draggable}
                        /> 
                    : 
                    undefined}
            </React.Fragment>
        );
    }
}

Modal.propTypes = {
    toggleBtnRef: PropTypes.node
}

export default Modal;