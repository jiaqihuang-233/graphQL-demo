import React, { useState, useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Spinner, VStack, Box, StackDivider } from '@chakra-ui/react';
import UserContext from '../context/user';

export default function MyReviewsList() {
  const user = useContext(UserContext);
  console.log('user reviews', user)
  return (
    <div>
      {user && (
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {' '}
          {user.reviews.map((review: any) => (
            <Box key={review.id} h="40px" bg="yellow.200">
              {JSON.stringify(review)}
            </Box>
          ))}
        </VStack>
      )}
    </div>
  );
}
