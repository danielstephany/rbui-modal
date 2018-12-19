import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CloseButton from './closeButton/closeButton';

class ModalInterface extends Component {

    componentDidMount(){
        if(this.props.modalOpen){
            setTimeout(()=>{
                this.modal.classList.add("active");
            },1);
        }
        this.focusIndex = 0;
        this.trapFocus();
        this.validateProps();
    }

    componentDidUpdate = () => {
        if(!this.props.modalOpen){
            this.modal.classList.remove("active");
        }
    }

    toggleModalContainerClose = (e) => {
        if (e.target.classList.contains('modal-container')) {
            this.props.closeModal();
        }
    }

    getfocusList = () => {
        return this.focusList;
    }

   

    modalKeyCtrl = (event) => {
            if(event.key === "Tab" && event.shiftKey){
                event.preventDefault();
                this.focusIndex = (this.focusIndex > 0)? (this.focusIndex - 1) : (this.focusList.length - 1);
                this.focusList[this.focusIndex].focus();
            }else if (event.key === "Tab") {
                event.preventDefault();
                this.focusIndex = (this.focusIndex < (this.focusList.length - 1))? (this.focusIndex + 1) : 0;
                this.focusList[this.focusIndex].focus();
            }else if (event.key === "Escape") {
                event.preventDefault();
                this.props.closeModal();
            }
    }

    trapFocus = () => {
        if(this.modal){
            this.focusList = this.modal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
            if(this.focusList.length){
                this.focusList[this.focusIndex].focus();
                this.modal.addEventListener("keydown", this.modalKeyCtrl);
            }
        }
    }

    validateProps = () => {
        if(this.props.children ){
            if(this.props.header || this.props.body || this.props.footer ){
                console.error('Warning: in Model,"props.children" should not be used with "props.header, props.body, or props.footer"');
            }
        }
    }

    render = () => {
        return (
        <div className='modal-container' role="dialog" aria-modal="true" ref={(div)=>{this.modal = div}} onClick={this.toggleModalContainerClose}>
            <div className="modal-interface" role="dialog">
                {(this.props.header && !this.props.children) ? <header className="modal-interface__header">{this.props.header}<CloseButton closeModal={this.props.closeModal}/></header> : undefined}
                {(this.props.body && !this.props.children) ? <div className="modal-interface__body">{this.props.body}</div> : undefined}
                {this.props.children}
                {(this.props.footer && !this.props.children) ? <footer className="modal-interface__footer">{this.props.footer}</footer> : undefined}
            </div>
        </div>
        );
    }
}

ModalInterface.propTypes = {
    header: PropTypes.object,
    body: PropTypes.object,
    footer: PropTypes.object,
    children: PropTypes.object
}

export default ModalInterface;