'use client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_URL ??
    'https://api-td.glpzghoo.space/graphql',
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
