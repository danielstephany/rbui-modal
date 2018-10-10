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
        // this update is used to prevent an infinate setState loop
        this.update = true;
    }

    componentWillUpdate = () => {
        this.toggleModal();
    }

    toggleModal = () => {
        if(this.update){
            if(!this.state.modalOpen){
                this.setState(
                    {
                        modalOpen: true,
                        modalActive: true
                    }, ()=>{
                        this.update = false;
                    });
            }else {
                if(this.state.modalActive){
                    this.setState({modalActive: false}, ()=>{
                        setTimeout(()=>{
                            this.setState({ modalOpen: false}, ()=>{
                                this.update = false;
                            });
                        },400);
                    });
                }
            }
        }else {
            this.update = true;
        }
    }

    closeModal = (e) => {
        if(typeof e !== 'undefined'){
            if(e.target.classList.contains("modal-container")){
                this.setState({modalActive: false}, ()=>{
                    setTimeout(()=>{
                        this.setState({ modalOpen: false});
                    },400);
                });
            }else {
                this.setState({modalActive: false}, ()=>{
                    setTimeout(()=>{
                        this.setState({ modalOpen: false});
                    },400);
                });
            }
        }     
    }

    render = () => {
        return (
            <React.Fragment>
                {this.state.modalOpen ? 
                    <ModalInterface
                        closeModal={this.closeModal} 
                        modalActive={this.state.modalActive} 
                        header={this.props.header} 
                        body={this.props.body} 
                        footer={this.props.footer}/> 
                    : 
                    undefined}
            </React.Fragment>
        );
    }
}

Modal.propTypes = {
    modalOpen: PropTypes.bool.isRequired
}

export default Modal;