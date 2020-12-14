import React from 'react';
import {shallow} from 'enzyme';
import { Homepage } from './homepage';


describe('HOmepage', () => {

    it('should render', () => {
      const component = shallow(<Homepage />).dive();
      expect(component).toMatchSnapshot();
      expect(component).toBeTruthy();
    });
  
  });