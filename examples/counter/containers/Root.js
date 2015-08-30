// import React, { Component } from 'react';
// import { Provider } from 'react-redux';
// import CounterApp from './CounterApp';
// import configureStore from '../store/configureStore';

// const store = configureStore();

// export default class Root extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         {() => <CounterApp />}
//       </Provider>
//     );
//   }
// }

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './CounterApp';
import counterApp from '../reducers';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;
console.log(initialState);
// Create Redux store with initial state
const store = createStore(counterApp, initialState);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('root')
);
