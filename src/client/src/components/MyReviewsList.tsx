import React, { useContext } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import UserContext from '../context/user';
import ReviewBox from './ReviewBox';
import { Review } from '../../../graphql/resolvers-types';

export default function MyReviewsList() {
  const user = useContext(UserContext);
  return (
    <Box flexGrow={2} width="60%">
      {user && (
        <Stack
          // divider={<StackDivider borderColor="gray" />}
          spacing={8}
          // align="stretch"
          m={10}
        >
          {' '}
          {user.reviews.map((review: Review) => (
            <ReviewBox key={review.id} review={review} showReviewer={false} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
