import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://fakerql.goosfraba.ro/graphql',
    mode: 'cors'
  })
});
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
