import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { initApolloClient } from './util/initApolloClient';
import { ApolloProvider } from '@apollo/client';

const client = initApolloClient();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
