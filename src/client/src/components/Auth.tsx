import React, { PropsWithChildren } from 'react';
import useUserInfoQuery from '../hooks/useUserInfoQuery';
import UserContext from '../context/user';
import { Box, Spinner } from '@chakra-ui/react';

interface AuthProps {
  children: any;
  userId: string;
}
export default function Auth({
  children,
  userId
}: PropsWithChildren<AuthProps>) {
  const [loading, userInfo] = useUserInfoQuery(userId);

  return (
    <UserContext.Provider value={userInfo}>
      {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
      ) : (
        children
      )}
    </UserContext.Provider>
  );
}
