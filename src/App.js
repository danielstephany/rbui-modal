import React, {Component} from 'react';
import Modal from './components/modal/Modal';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalOpen: false
        }
    }
    
    //this is how the modal can be opened using the openModal method from the modal instance
    openModal = (resetFucusElement) => {
        this.modal.openModal(resetFucusElement);
    }

    render = () => {
  
        return(
            <div>
                <div className="banner">
                    <article> 
                        <h2>Lorem ipsum dolor prism blue bottle.</h2>
                        {/* below is an example of using a method from the modal instance. it must be wrapped in the anonamas function */}
                        <p>Lorem ipsum dolor amet prism blue bottle copper mug coloring book kale chips pour-over ennui shoreditch godard. Typewriter letterpress hot chicken, waistcoat tumblr lomo cornhole. Intelligentsia activated charcoal mustache selvage fam schlitz gentrify food truck.</p>
                        <button className="modal-button" id="modal-button-1" onClick={()=>{this.modal.openModal("modal-button-1")}}>open using modal instance method (id)</button>
                        <button className="modal-button" ref={button => {this.button = button}} onClick={()=>{this.modal.openModal(this.button)}}>open using modal instance method (ref)</button>
                        <button className="modal-button" id="modal-button">open by passing in id to modal instance</button>
                        <Modal 
                            ref={(div)=>{this.modal = div;}}
                            transitionTime={200}
                            toggleBtnRef={"modal-button"}
                            closeButton={true}
                            header={"this is a test header"}
                            body={<p>Lorem ipsum dolor amet prism <a href="#">test</a> blue bottle copper mug coloring book kale chips pour-over ennui shoreditch godard. Typewriter letterpress hot chicken, waistcoat tumblr lomo cornhole. Intelligentsia activated charcoal mustache selvage fam schlitz gentrify food truck.</p>}
                            footer={<button onClick={()=>{this.modal.closeModal("modal-button-1")}}>close</button>}
                            draggable={true}
                       >
                        </Modal>
                    </article>
                </div>
            </div>
        )
    }
}

export default App;