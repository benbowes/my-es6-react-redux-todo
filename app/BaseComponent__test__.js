import 'ignore-styles';
import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { BaseComponent } from './BaseComponent';
import TodosHeader from './components/TodosHeader';
import Label from './components/common/Label';
import RemoveTodo from './components/RemoveTodo';
import AddNewTodo from './components/AddNewTodo';

const shallowRenderer = ReactTestUtils.createRenderer();
const fakeDispatchFunction = () => false;

describe('<BaseComponent />', () => {

  it('It should render as expected when several items are supplied', () => {

    shallowRenderer.render(
      <BaseComponent
        items={['Go to park', 'Eat cheese']}
        counter={2}
        warningColour={{ count: 0, colour: '#ff0000' }}
        dispatch={fakeDispatchFunction}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    //  TodosHeader
    expect(result.props.children[0].type).toEqual( TodosHeader );

    // No Todos Message
    expect(result.props.children[1]).toEqual( false );

    //  Todos List
    expect(result.props.children[2][0].type).toEqual( 'div' );
    expect(result.props.children[2][0].key).toEqual( 'Go_to_park_0' );
    expect(result.props.children[2][0].props.children[0].type).toEqual( Label );
    expect(result.props.children[2][0].props.children[0].props.label).toEqual( 'Go to park' );
    expect(result.props.children[2][0].props.children[1].type).toEqual( RemoveTodo );

    expect(result.props.children[2][1].type).toEqual( 'div' );
    expect(result.props.children[2][1].key).toEqual( 'Eat_cheese_1' );
    expect(result.props.children[2][1].props.children[0].type).toEqual( Label );
    expect(result.props.children[2][1].props.children[0].props.label).toEqual( 'Eat cheese' );
    expect(result.props.children[2][1].props.children[1].type).toEqual( RemoveTodo );

    // AddNewTodo
    expect(result.props.children[3].type).toEqual( AddNewTodo );
    expect(result.props.children[3].props.dispatch).toEqual( fakeDispatchFunction );
  });

  it('It should render as expected when NO items are supplied', () => {

    shallowRenderer.render(
      <BaseComponent
        items={[]}
        counter={0}
        warningColour={{ count: 0, colour: '#ff0000' }}
        dispatch={fakeDispatchFunction}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    //  TodosHeader
    expect(result.props.children[0].type).toEqual( TodosHeader );

    // No Todos Message
    expect(result.props.children[1].props.children).toEqual( 'Oh my, you`ve been busy...' );

    //  Todos List
    expect(result.props.children[2]).toEqual( [] );
    expect(result.props.children[2].length).toEqual( 0 );

    // AddNewTodo
    expect(result.props.children[3].type).toEqual( AddNewTodo );
    expect(result.props.children[3].props.dispatch).toEqual( fakeDispatchFunction );
  });

});
