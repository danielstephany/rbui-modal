import React, {Component} from 'react';

class ModalInterface extends Component {

    componentDidMount(){
        if(this.props.modalOpen){
            setTimeout(()=>{
                this.modal.classList.add("active");
            },1);
        }
        this.trapFocus();
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

    trapFocus = () => {
        let focusIndex = 0;

        this.focusList = this.modal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
        this.focusList[focusIndex].focus();

        this.modal.addEventListener("keydown", (e)=>{
            if(e.key === "Tab" && e.shiftKey){
                e.preventDefault();
                focusIndex = (focusIndex > 0)? (focusIndex - 1) : (this.focusList.length - 1);
                this.focusList[focusIndex].focus();
            }else if (e.key === "Tab") {
                e.preventDefault();
                focusIndex = (focusIndex < (this.focusList.length - 1))? (focusIndex + 1) : 0;
                this.focusList[focusIndex].focus();
            }else if (e.key === "Escape") {
                e.preventDefault();
                this.props.closeModal();
            }
        });
    }

    render = () => {
        return (
        <div className='modal-container' ref={(div)=>{this.modal = div}} onClick={this.toggleModalContainerClose}>
            <div className="modal-interface">
                {this.props.header ? <header>{this.props.header}</header> : undefined}
                {this.props.body ? <article>{this.props.body}</article> : undefined}
                {this.props.children}
                {this.props.footer ? <footer>{this.props.footer}</footer> : undefined}
            </div>
        </div>
        );
    }
}

export default ModalInterface;