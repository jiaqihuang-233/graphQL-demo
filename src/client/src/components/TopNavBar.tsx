import { Box, Button, Flex, Stack, Divider } from '@chakra-ui/react';
import React, { useContext } from 'react';
import UserContext from '../context/user';
import { Link } from 'react-router-dom';
export default function TopNavBar() {
  const user = useContext(UserContext);

  return (
    <div>
      <Flex
        height="100px"
        width="100%"
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        padding={5}
      >
        {user && <Box fontSize="xx-large">{user.name}</Box>}
        <Stack direction="row" spacing={4} align="center">
          <Link to="/games">
            <Button
              colorScheme="teal"
              variant="outline"
              fontSize="large"
            >
              Games
            </Button>
          </Link>
          <Link to="/my-reviews">
            <Button colorScheme="teal" variant="outline" fontSize="large">
              My Reviews
            </Button>
          </Link>
        </Stack>
      </Flex>
      <Divider />
    </div>
  );
}
