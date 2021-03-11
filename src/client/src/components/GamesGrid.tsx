import React, { useState, useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Spinner, SimpleGrid, GridItem, Box } from "@chakra-ui/react"
import GameBox from './GameBox';
import { Game } from '../../../graphql/resolvers-types';

export default function GamesGrid() {
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
  
  const { loading, data } = useQuery(GET_ALL_GAMES);
  return (
    <Box flexGrow={2} width="60%">
      {loading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}

      {data && data.getAllGames && (
        <SimpleGrid columns={[2, null, 3]} spacing="20px" m={6}>
          {data.getAllGames.map((game: Game) => (
            <GameBox game={game} key={game.id} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}