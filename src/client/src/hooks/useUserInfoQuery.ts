import { gql, useQuery } from '@apollo/client';
import { User } from '../../../graphql/resolvers-types';
import { useState, useMemo } from 'react';

export type useUserInfoQueryResult = [boolean, User | undefined];

export default function useUserInfoQuery(
  userId: string
): useUserInfoQueryResult {
  const [data, setData] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  
  const GET_USER_INFO = gql`
    query user($userId: ID!) {
      user(id: $userId) {
        id
        name
        reviews {
          id
          rating
          comment
          rating
          dateCreated
          game {
            title
            imageUrl
            price
          }
        }
      }
    }
  `;

  useQuery(GET_USER_INFO, {
    variables: { userId },
    onCompleted: (data) => {
      setData(data.user);
      setLoading(false);
    }
  });

  return useMemo(() => [loading, data], [data, loading]);
}
