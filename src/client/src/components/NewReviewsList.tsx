import {
  gql,
  useSubscription,
} from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { Review } from '../../../graphql/resolvers-types';

export default function NewReviewsList(){
  const [ latestReviews, setLatestReviews ] = useState<Review[]>([]);
  const MAX_LIST_LENGTH = 10;

  //save most recent 10 new reviews
  const REVIEW_SUBSCRIPTION = gql`
  subscription newReviewAdded($subscribedGameIds: [ID!]!) {
    newReviewAdded(subscribedGameIds: $subscribedGameIds) {
      id
      game {
        title
      }
      reviewer {
        name
      }
      rating
      dateCreated
    }
  }
`;

 const { loading } = useSubscription(REVIEW_SUBSCRIPTION, {
   variables: { subscribedGameIds: [] },
   onSubscriptionData: ({ subscriptionData }) => {
     const currentReviews = [...latestReviews]
     if (currentReviews.length === MAX_LIST_LENGTH) {
       currentReviews.shift();
     }
     const { newReviewAdded } = subscriptionData.data;
     currentReviews.push(newReviewAdded);
     setLatestReviews(currentReviews);
   }
 });
  

  return <div>{!loading && latestReviews.map(review => <Box key={review.id}>{JSON.stringify(review)}</Box>)}</div>;
};

