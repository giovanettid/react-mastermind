import 'raf/polyfill';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import sinon from 'sinon';
import { expect } from 'chai';

global.sinon = sinon;
global.expect = expect;
global.shallow = shallow;
global.mount = mount;

configure({ adapter: new Adapter() });
