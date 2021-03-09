import React from 'react';
import { initApolloClient } from './util/initApolloClient';
import { ApolloProvider } from '@apollo/client';
import GamesGrid from './components/GamesGrid';
import MyReviewsList from './components/MyReviewsList';
import NewReviewsList from './components/NewReviewsList';
import UserContext from './context/user';
import useUserInfoQuery from './hooks/useUserInfoQuery';


const currentUserId = 'e4e94d22-afeb-48d4-bc82-c1d7dcf7742d';

function App() {
  const client = initApolloClient();

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <GamesGrid />
        <MyReviewsList userId={currentUserId} />
        <NewReviewsList />
      </div>
    </ApolloProvider>
  );
}

export default App;
