import { gql, useQuery } from '@apollo/client';

export default function useUserInfoQuery (userId: string) {
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

  return [loading, data];
}

