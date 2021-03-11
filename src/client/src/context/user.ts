import { createContext } from 'react';
import { User } from '../../../graphql/resolvers-types';

const UserContext = createContext<User | undefined>(undefined);

export default UserContext;
