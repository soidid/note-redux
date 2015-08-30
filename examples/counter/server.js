// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var config = require('./webpack.config');

// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   historyApiFallback: true,
//   stats: {
//     colors: true
//   }
// }).listen(3000, 'localhost', function (err) {
//   if (err) {
//     console.log(err);
//   }

//   console.log('Listening at localhost:3000');
// });


import path from 'path';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counterApp from './reducers';
import App from './containers/CounterApp';

const app = Express();
const port = 8080;

// Use this middleware to serve up static files built into the dist directory
app.use(require('serve-static')(path.join(__dirname, 'dist')));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req, res) { 

  // Create a new Redux store instance
  const store = createStore(counterApp);

  // Render the component to a string
  const html = React.renderToString(
    <Provider store={store}>
      {() => <App />}
    </Provider>
  );

  // Grab the initial state from our Redux store
  const initialState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, initialState));


}
function renderFullPage(html, initialState) {

  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `;

}

app.listen(port, ()=>{
  console.log(`app listening at port ${port}`);
});
