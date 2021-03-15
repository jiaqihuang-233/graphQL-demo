import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { gql, useQuery, useMutation } from '@apollo/client';
import faker from 'faker';
import { comments } from '../statics/comments';
import { Game } from '../../../graphql/resolvers-types';

async function delay(ms: number) {
  // return await for better async stack trace support in case of errors.
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function GenerateReviews() {
  const [games, setGames] = useState<Game[]>([]);

  const GET_ALL_GAMES = gql`
    query GetAllGames {
      getAllGames {
        title
        id
        averageRating
        price
        imageUrl
      }
    }
  `;

  useQuery(GET_ALL_GAMES, {
    onCompleted: (data) => {
      setGames(data.getAllGames);
    }
  });

  const ADD_USER_MUTATION = gql`
    mutation addUser($name: String!) {
      addUser(input: { name: $name }) {
        id
        name
      }
    }
  `;

  const ADD_REVIEW_MUTATION = gql`
    mutation addReview(
      $gameId: ID!
      $reviewerId: ID!
      $rating: Int!
      $comment: String!
    ) {
      addReview(
        input: {
          gameId: $gameId
          reviewerId: $reviewerId
          rating: $rating
          comment: $comment
        }
      ) {
        rating
        comment
      }
    }
  `;

  const [addUser] = useMutation(ADD_USER_MUTATION);
  const [addReview] = useMutation(ADD_REVIEW_MUTATION);

  const generateReview = async () => {
    if (!games) await delay(1000);
    const name = faker.name.firstName();
    const gameId = games[randomIntFromInterval(0, games.length - 1)].id;
    const comment = comments[randomIntFromInterval(0, comments.length - 1)];
    const { data } = await addUser({
      variables: {
        name
      }
    });
    const { id: reviewerId } = data.addUser;

    await addReview({
      variables: {
        reviewerId,
        gameId,
        rating: randomIntFromInterval(1, 5),
        comment
      }
    });
  };

  return (
    <Button m={40} onClick={generateReview}>
      Generate A Review
    </Button>
  );
}
