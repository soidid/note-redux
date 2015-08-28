import React, { Component } from 'react';
import TodoApp from './TodoApp';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

/*
You may optionally specify the initial state as the second argument to createStore(). 
This is useful for hydrating the state of the client to match the state of a Redux application running on the server.

let store = createStore(todoApp, window.STATE_FROM_SERVER);

///
從 server 拿資料來更新 client 端

*/

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <TodoApp /> }
      </Provider>
    );
  }
}
