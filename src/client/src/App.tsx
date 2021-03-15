import { Flex } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './components/Auth';
import GamesGrid from './components/GamesGrid';
import MyReviewsList from './components/MyReviewsList';
import NewReviewsList from './components/NewReviewsList';
import TopNavBar from './components/TopNavBar';
import GenerateReviews from './components/GenerateReviews';

const currentUserId = '9daf2daa-b04a-44e6-b787-3381fe79d24f';

export default function App() {
  return (
    <Router>
      <Auth userId={currentUserId}>
        <div className="app">
          <TopNavBar />
          <Flex justifyContent="space-between">
            <Switch>
              <Route path={['/gr']}>
                <GenerateReviews />
              </Route>
              <Route path="/my-reviews">
                <MyReviewsList />
                <NewReviewsList />
              </Route>
              <Route path={['/', '/games']}>
                <GamesGrid />
                <NewReviewsList />
              </Route>
            </Switch>
          </Flex>
        </div>
      </Auth>
    </Router>
  );
}
