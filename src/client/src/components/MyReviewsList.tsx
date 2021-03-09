import React, { useState, useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Spinner, VStack, Box, StackDivider } from '@chakra-ui/react';

type MyReviewsListProps = {
  userId: string;
}

export default function MyReviewsList(props: MyReviewsListProps) {
  const { userId } = props;
  const GET_USER_REVIEWS = gql`
    query user($userId: ID!) {
      user(id: $userId) {
        id
        name
        reviews {
          id
          rating
        }
        gamesInLibrary {
          id
          title
          price
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_USER_REVIEWS, {
    variables: { userId }
  });

  console.log(data);

  return (
    <div>
      {loading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}

      {data && data.user && (
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {' '}
          {data.user.reviews.map((review: any) => (
            <Box key={review.id} h="40px" bg="yellow.200">
              {JSON.stringify(review)}
            </Box>
          ))}
        </VStack>
      )}
    </div>
  );
}
