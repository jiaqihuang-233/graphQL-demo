import { Flex } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './components/Auth';
import GamesGrid from './components/GamesGrid';
import MyReviewsList from './components/MyReviewsList';
import NewReviewsList from './components/NewReviewsList';
import TopNavBar from './components/TopNavBar';

const currentUserId = '9674e69f-f971-4bc7-9aff-c02db3bec3c6';

export default function App() {
  return (
    <Router>
      <Auth userId={currentUserId}>
        <div className="app">
          <TopNavBar />
          <Flex justifyContent="space-between">
            <Switch>
              <Route path="/my-reviews">
                  <MyReviewsList />
              </Route>
              <Route path={['/', '/games']}>
                <GamesGrid />
              </Route>
            </Switch>
            <NewReviewsList />
          </Flex>
        </div>
      </Auth>
    </Router>
  );
}
