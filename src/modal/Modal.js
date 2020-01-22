import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './modal.scss';
import ModalInterface from './ModalInterface.js';

/**
- Use a modal to display extra important information.
- The modal can take a child prop or be passed a prob called body.
**/

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
        if (this.modalToggleButton) {
          this.modalToggleButton.removeEventListener("click", this.toggleModal);
        }
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
  /** A boolean that when set to true displays the close icon in the modals header */
  closeButton: PropTypes.bool,
  /** sets the max width of the modal */
  maxWidth: PropTypes.number,
  /** sets the transition time for the modals animations */
  transitionTime: PropTypes.number,
  /** A boolean used to detect if the modal should be open or closed */
  modalOpen: PropTypes.bool.isRequired,
  /** A function passed to the modal that will change the modalOpen state value to false */
  handleClose: PropTypes.func.isRequired,
  /** A refrence to the button used to toggle the modal open (used to refocus on close) */
  elementToFocusOnClose: PropTypes.object,
  /** A string or an element to go inside the modal header */
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** A string or an element to go inside the modal body */
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** A string or an element to go inside the modal footer */
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** A boolean that when true makes the modal draggable when grabbed by the header */
  draggable: PropTypes.bool,
  /** A boolean that when true makes it imposible to drag the modal out of the header */
  containedInWindow: PropTypes.bool
};

Modal.defaultProps = {
  closeButton: false,
  maxWidth: 600,
  transitionTime: 400,
  modalOpen: false,
  elementToFocusOnClose: null,
  header: null,
  body: null,
  footer: null,
  draggable: false,
  containedInWindow: true
};

export default Modal;