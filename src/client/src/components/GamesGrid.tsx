import React, { useState, useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Spinner, Grid, GridItem, Box } from "@chakra-ui/react"

export default function GamesGrid() {
  const GET_ALL_GAMES = gql`
    query GetAllGames {
      getAllGames {
        title
        id
        averageRating
        price
      }
    }
  `;  
  
  const { loading, error, data } = useQuery(GET_ALL_GAMES);
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

      {data && data.getAllGames && (
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {data.getAllGames.map((game: any) => (
            <Box
              key={game.id}
              w="100%"
              h="10"
              p={5}
              border="2px"
              borderColor="gray"
            >
              {' '}
              {game.title}{' '}
            </Box>
          ))}
        </Grid>
      )}
    </div>
  );
}