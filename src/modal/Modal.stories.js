import React from 'react';
import { action } from "@storybook/addon-actions";
import Modal from './Modal.js';

export default {
  title: "Modal",
  parameters: {
    component: Modal,
    componentSubtitle:
      "A popup modal"
  }
};

export const baseModal = () => (
         <Modal
           modalOpen={true}
           handleClose={action("close")}
           transitionTime={400}
           closeButton={true}
           header={"this is a test header"}
           body={
             <p>
               Lorem ipsum dolor amet prism <a href="">test</a> blue bottle
               copper mug coloring book kale chips pour-over ennui shoreditch
               godard. Typewriter letterpress hot chicken, waistcoat tumblr lomo
               cornhole. Intelligentsia activated charcoal mustache selvage fam
               schlitz gentrify food truck.
             </p>
           }
           footer={<button onClick={action("close")}>close</button>}
           draggable={false}
           containedInWindow={true}
           maxWidth={600}
         ></Modal>
       );

export const draggableModal = () => (
  <Modal
    modalOpen={true}
    handleClose={action("close")}
    transitionTime={400}
    closeButton={true}
    header={"this is a test header"}
    body={
      <p>
        Lorem ipsum dolor amet prism <a href="">test</a> blue bottle copper mug
        coloring book kale chips pour-over ennui shoreditch godard. Typewriter
        letterpress hot chicken, waistcoat tumblr lomo cornhole. Intelligentsia
        activated charcoal mustache selvage fam schlitz gentrify food truck.
      </p>
    }
    footer={<button onClick={action("close")}>close</button>}
    draggable={true}
    containedInWindow={true}
    maxWidth={600}
  ></Modal>
);