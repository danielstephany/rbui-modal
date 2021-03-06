import React, {Component} from 'react';
import Modal from 'dsui-modal';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalOpen: false
        }
    }

    openModal = () => {
        this.setState({modalOpen: !this.state.modalOpen});
    }

    closeModal = () => {
        this.setState({modalOpen: false});
    }

    render = () => {
  
        return(
            <div>
                <div className="banner">
                    <article> 
                        <h2>Lorem ipsum dolor prism blue bottle.</h2>
                        <p>Lorem ipsum dolor amet prism blue bottle copper mug coloring book kale chips pour-over ennui shoreditch godard. Typewriter letterpress hot chicken, waistcoat tumblr lomo cornhole. Intelligentsia activated charcoal mustache selvage fam schlitz gentrify food truck.</p>
                        <button className="modal-button" ref={button => {this.button = button}} onClick={this.openModal}>open by passing in id to modal instance</button>
                        <Modal 
                            modalOpen={this.state.modalOpen}
                            handleClose={this.closeModal}
                            transitionTime={400}
                            elementToFocusOnClose={this.button}
                            closeButton={true}
                            header={"this is a test header"}
                            body={<p>Lorem ipsum dolor amet prism <a href="">test</a> blue bottle copper mug coloring book kale chips pour-over ennui shoreditch godard. Typewriter letterpress hot chicken, waistcoat tumblr lomo cornhole. Intelligentsia activated charcoal mustache selvage fam schlitz gentrify food truck.</p>}
                            footer={<button onClick={this.closeModal}>close</button>}
                            draggable={true}
                            containedInWindow={true}
                            maxWidth={600}
                       >
                        </Modal>
                    </article>
                </div>
            </div>
        )
    }
}

export default App;