import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { withScalars } from 'apollo-link-scalars';
import { buildClientSchema, IntrospectionQuery } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';
import introspectionResult from '../graphql/schema.json';
import { WindowEnv } from '../models';
import { AuthService } from '../services';
import { EnvVar } from '../utils';

const createApolloClient = () => {
  // create authLink
  const authLink = setContext((_, { headers }) => {
    const token = AuthService.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  // create scalarsLink
  const schema = buildClientSchema(
    introspectionResult as unknown as IntrospectionQuery
  );
  const scalarsLink = withScalars({
    schema,
    typesMap: { DateTime: DateTimeResolver },
  });

  // create httpLink
  const env = new WindowEnv();
  const httpLink = createHttpLink({
    uri: env.get(EnvVar.API_URL),
  });

  // create the link chain
  const link = ApolloLink.from([authLink, scalarsLink, httpLink]);

  // Return the ApolloClient
  return new ApolloClient({
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // incoming should override existing
            accounts: { merge: false },
            holdings: { merge: false },
            orders: { merge: false },
            transactions: { merge: false },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        // Executes queries against both the cache and the GraphQL server.
        // The query automatically updates if the result of the server-side
        // query modifies the cached fields.
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'network-only',
      },
    },
  });
};

export const GraphQlUtils = {
  createApolloClient,
};
