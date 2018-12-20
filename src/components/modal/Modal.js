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
    }

    componentDidMount = () => {
        this.toggleModal(); 
    }
    componentDidUpdate = () => {
        this.toggleModal(); 
    }

    OpenModal = () => {
        this.setState({
            modalOpen: true,
            modalActive: true
        }, ()=>{
            this.modalClosed = false;
        });
    }

    closeModal = () => {
        this.setState({ modalOpen: false}, ()=>{
            setTimeout(()=>{
                this.setState({ modalActive: false }, () => {
                    this.modalClosed = true;
                    this.props.closeModal();
                });
            },400);
        });   
    }

    toggleModal = () => {
        if (this.props.modalOpen && this.modalClosed) {
            this.OpenModal();
        } else if (!this.props.modalOpen && !this.modalClosed) {
            this.closeModal();
        }
    }

    render = () => {
        return (
            <React.Fragment>
                {this.state.modalActive ? 
                    <ModalInterface
                        closeButton={this.props.closeButton}
                        closeModal={this.closeModal} 
                        modalOpen={this.state.modalOpen} 
                        header={this.props.header} 
                        body={this.props.body} 
                        footer={this.props.footer}
                        children={this.props.children}/> 
                    : 
                    undefined}
            </React.Fragment>
        );
    }
}

Modal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    toggleBtnRef: PropTypes.node.isRequired
}

export default Modal;