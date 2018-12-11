import React, {Component} from 'react';
import Modal from './components/modal/Modal';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalOpen: false
        }
    }

    openModal = () => {
        this.setState({modalOpen: true}); 
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
                        <button className="modal-button" onClick={this.openModal}>View More</button>
                        <Modal 
                            modalOpen={this.state.modalOpen}
                            closeModal={this.closeModal}
                            header={<div><h3>this is a test header</h3> <button>test</button></div>}
                            body={<p>Lorem ipsum dolor amet prism <a href="#">test</a> blue bottle copper mug coloring book kale chips pour-over ennui shoreditch godard. Typewriter letterpress hot chicken, waistcoat tumblr lomo cornhole. Intelligentsia activated charcoal mustache selvage fam schlitz gentrify food truck.</p>}
                            footer={<button onClick={this.closeModal}>close</button>}
                        />
                    </article>
                </div>
            </div>
        )
    }
}

export default App;