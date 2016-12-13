import React, { PropTypes } from 'react';
import Button from './common/Button';

/**
* @description triggers a `redux dispatch` call that updates the redux store
* @param dispatch {function} a redux `store.dispatch` reference
* @param index {number} injected as a prop via BaseComponent's render method  */

const RemoveTodoHandler = ( dispatch, index ) => {
  console.log({ type: 'REMOVE_ITEM', payload: index });
};

const RemoveTodo = ({ buttonTitle, index, dispatch }) => {
  return (
    <Button
      buttonTitle={buttonTitle}
      label="&#10005;"
      clickHandler={() => RemoveTodoHandler( dispatch, index )}
    />
  );
};

RemoveTodo.propTypes = {
  buttonTitle: PropTypes.string,
  dispatch: PropTypes.func,
  index: PropTypes.number,
};

export default RemoveTodo;
