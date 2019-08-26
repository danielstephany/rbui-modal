import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ModalInterface from './ModalInterface.js';


describe('<ModalInterface />', () => {
    const div = document.createElement('div');

    it('renders containing a footer', () => {
        const wrapper = shallow(<ModalInterface modalOpen={true} footer={<button>test button</button>} />);
        expect(wrapper.contains(<footer><button>test button</button></footer>)).toBe(true);
    });


    it('renders containing a footer', () => {
        const wrapper = shallow(<ModalInterface modalOpen={true}><footer><button>test button</button></footer></ModalInterface>);
        expect(wrapper.contains(<footer><button>test button</button></footer>)).toBe(true);
    });

    it('component contains only one footer', () => {
        const wrapper = shallow(<ModalInterface modalOpen={true}><footer><button>test button</button></footer></ModalInterface>);
        console.log(wrapper.debug());
        console.log(wrapper.find("footer").length);
        expect(wrapper.find("footer").length).toBe(1);
    });

});