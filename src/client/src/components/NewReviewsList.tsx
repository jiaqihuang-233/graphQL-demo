import { gql, useSubscription } from '@apollo/client';
import { Box, Flex, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Review } from '../../../graphql/resolvers-types';
import ReviewBox from './ReviewBox';

export default function NewReviewsList() {
  const [latestReviews, setLatestReviews] = useState<Review[]>([]);
  const MAX_LIST_LENGTH = 10;

  //save most recent 10 new reviews
  const REVIEW_SUBSCRIPTION = gql`
    subscription newReviewAdded($subscribedGameIds: [ID!]!) {
      newReviewAdded(subscribedGameIds: $subscribedGameIds) {
        id
        comment
        game {
          title
          imageUrl
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
      const currentReviews = [...latestReviews];
      if (currentReviews.length === MAX_LIST_LENGTH) {
        currentReviews.shift();
      }
      const { newReviewAdded } = subscriptionData.data;
      currentReviews.push(newReviewAdded);
      setLatestReviews(currentReviews);
    }
  });

  return (
    <Box  width="30%" m={5} flexGrow={1}>
      <Flex flexDirection="column">
        <Box m={3}>
          <Heading as="h3" size="lg">New Reviews</Heading>
        </Box>

        {!loading &&
          latestReviews.map((review) => (
            <ReviewBox key={review.id} review={review} showReviewer={true} />
          ))}
      </Flex>
    </Box>
  );
}
