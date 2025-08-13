'use client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://api-td.glpzghoo.space/graphql'
      : 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});
const ApolloProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export { ApolloProviderComponent, client };
