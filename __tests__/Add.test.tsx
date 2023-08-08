import React from 'react';
import renderer from 'react-test-renderer';
import Add from '../src/component/Add'; 
describe('Add Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Add />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
