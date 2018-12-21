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
    openModal = () => {
        this.modal.openModal();
    }

    render = () => {
  
        return(
            <div>
                <div className="banner">
                    <article> 
                        <h2>Lorem ipsum dolor prism blue bottle.</h2>
                        {/* below is an example of using a method from the modal instance. it must be wrapped in the anonamas function */}
                        <p onClick={()=>{this.modal.openModal()}}>Lorem ipsum dolor amet prism blue bottle copper mug coloring book kale chips pour-over ennui shoreditch godard. Typewriter letterpress hot chicken, waistcoat tumblr lomo cornhole. Intelligentsia activated charcoal mustache selvage fam schlitz gentrify food truck.</p>
                        <button className="modal-button" id="modal-button" ref={(button)=>{this.modalButton = button;}}>View More</button>
                        <Modal 
                            ref={(div)=>{this.modal = div;}}
                            toggleBtnRef={"modal-button"}
                            closeButton={true}
                            modalOpen={this.state.modalOpen}
                            closeModal={this.closeModal}
                            header={"this is a test header"}
                            body={<p>Lorem ipsum dolor amet prism <a href="#">test</a> blue bottle copper mug coloring book kale chips pour-over ennui shoreditch godard. Typewriter letterpress hot chicken, waistcoat tumblr lomo cornhole. Intelligentsia activated charcoal mustache selvage fam schlitz gentrify food truck.</p>}
                            footer={<button onClick={this.closeModal}>close</button>}
                        >
                        </Modal>
                    </article>
                </div>
            </div>
        )
    }
}

export default App;