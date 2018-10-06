import React, {Component} from 'react';

class ModalInterface extends Component {

    componentDidMount(){
        if(this.props.modalActive){
            setTimeout(()=>{
                this.modal.classList.add("active");
            },1);
        }
    }

    componentDidUpdate = () => {
        if(!this.props.modalActive){
            this.modal.classList.remove("active");
        }
    }

    render = () => {
        return (
        <div className='modal-container' ref={(div)=>{this.modal = div}} onClick={(e)=>{this.props.closeModal(e)}}>
            <div className="modal-interface">
                <header>{this.props.header}</header>
                <article>{this.props.body}</article>
                <footer>{this.props.footer}</footer>
            </div>
        </div>
        );
    }
}

export default ModalInterface;