import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveItem from './with-active-item';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../reducers/index';

configure({adapter: new Adapter()});
const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`Test HOC Component`, () => {
  const wrapper = shallow(
      <Provider store={createStore(reducer)}>
        <MockComponentWrapped />
      </Provider>
  );

  expect(wrapper.props().onActiveItemChange).toEqual(undefined);
});
