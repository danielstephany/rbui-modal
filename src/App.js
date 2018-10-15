import React, {Component} from 'react';
import Modal from './components/modal/Modal';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalOpen: false
        }
    }

    toggleModal = () => {
        this.setState(state => ({modalOpen: !state.modalOpen})); 
    }

    render = () => {
        return(
            <div>
                <div className="banner">
                    <article> 
                        <h2>Lorem ipsum dolor prism blue bottle.</h2>
                        <p>Lorem ipsum dolor amet prism blue bottle copper mug coloring book kale chips pour-over ennui shoreditch godard. Typewriter letterpress hot chicken, waistcoat tumblr lomo cornhole. Intelligentsia activated charcoal mustache selvage fam schlitz gentrify food truck.</p>
                        <button className="modal-button" onClick={this.toggleModal}>View More</button>
                        <Modal 
                            modalOpen={this.state.modalOpen}
                            header={<header><h3>this is a test header</h3></header>}
                            body={<article><p>Lorem ipsum dolor amet prism blue bottle copper mug coloring book kale chips pour-over ennui shoreditch godard. Typewriter letterpress hot chicken, waistcoat tumblr lomo cornhole. Intelligentsia activated charcoal mustache selvage fam schlitz gentrify food truck.</p></article>}
                            footer={<footer><button onClick={this.toggleModal}>close</button></footer>}
                        />
                    </article>
                </div>
            </div>
        )
    }
}

export default App;