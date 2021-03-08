import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
  uri: "ws://localhost:8000/subscriptions",
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  link,
  cache: new InMemoryCache()
});

client.query({
  query: gql`
    query User {
      user(id: "e4e94d22-afeb-48d4-bc82-c1d7dcf7742d") {
        name
        reviews {
          rating
        }
      }
    }
  `
}).then(result => console.log(result));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

