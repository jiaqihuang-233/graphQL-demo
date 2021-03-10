import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './components/Auth';
import GamesGrid from './components/GamesGrid';
import MyReviewsList from './components/MyReviewsList';
import NewReviewsList from './components/NewReviewsList';
import TopNavBar from './components/TopNavBar';

const currentUserId = 'e4e94d22-afeb-48d4-bc82-c1d7dcf7742d';

export default function App() {
  return (
    <Router>
      <Auth userId={currentUserId}>
        <div className="app">
          <TopNavBar />
          <Switch>
            <Route path="/my-reviews">
              <MyReviewsList />
            </Route>
            <Route path={['/', '/games']}>
              <GamesGrid />
            </Route>
          </Switch>
          <NewReviewsList />
        </div>
      </Auth>
    </Router>
  );
}
