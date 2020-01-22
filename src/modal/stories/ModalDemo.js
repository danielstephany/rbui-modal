import React, { Component } from 'react';
import Modal from 'dsui-modal';
import './ModalDemo.scss';

class ModalDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            draggableModalOpen: false
        }
    }

    openModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    closeModal = () => {
        this.setState({ modalOpen: false });
    }

    openDraggableModal = () => {
        this.setState({ draggableModalOpen: !this.state.draggableModalOpen });
    }

    closeDraggableModal = () => {
        this.setState({ draggableModalOpen: false });
    }

    render = () => {

        return (
            <div>
                <div className="banner">
                    <article>
                        <button className="demo-button" ref={button => { this.button = button }} onClick={this.openModal}>Open Static Modal</button>
                        <button className="demo-button" ref={button => { this.draggablebutton = button }} onClick={this.openDraggableModal}>Open Draggable Modal</button>

                        <Modal
                            modalOpen={this.state.modalOpen}
                            handleClose={this.closeModal}
                            transitionTime={400}
                            elementToFocusOnClose={this.button}
                            closeButton={true}
                            header={"this is a test header"}
                            body={<p>Lorem ipsum dolor amet prism <a href="">test</a> blue bottle copper mug coloring book kale chips pour-over ennui shoreditch godard. Typewriter letterpress hot chicken, waistcoat tumblr lomo cornhole. Intelligentsia activated charcoal mustache selvage fam schlitz gentrify food truck.</p>}
                            footer={<button onClick={this.closeModal}>close</button>}
                            draggable={false}
                            containedInWindow={true}
                            maxWidth={600}
                        >
                        </Modal>
                        <Modal
                            modalOpen={this.state.draggableModalOpen}
                            handleClose={this.closeDraggableModal}
                            transitionTime={400}
                            elementToFocusOnClose={this.draggablebutton}
                            closeButton={true}
                            header={"this is a test header"}
                            body={<p>Lorem ipsum dolor amet prism <a href="">test</a> blue bottle copper mug coloring book kale chips pour-over ennui shoreditch godard. Typewriter letterpress hot chicken, waistcoat tumblr lomo cornhole. Intelligentsia activated charcoal mustache selvage fam schlitz gentrify food truck.</p>}
                            footer={<button onClick={this.closeDraggableModal}>close</button>}
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

export default ModalDemo;