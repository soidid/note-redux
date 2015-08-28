import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';

class TodoApp extends Component {
  render() {
    const { todos, dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);
    ///// dispatch 到底是什麼？感覺用 redux 架構，好像都不用管，他直接就包好了，但不太懂是怎麼接起來的

    return (
      <div>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    );
  }
}

TodoApp.propTypes = {
  todos: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function select(state) {
  return {
    todos: state.todos
    //todos: state.a
  };
}

export default connect(select)(TodoApp);
//connect 是什麼