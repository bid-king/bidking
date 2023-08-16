import { Global, css } from '@emotion/react';
import React from 'react';
import { AppRouter } from './router/AppRouter';
import { globalStyle } from './_libs/design/globalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyle} />
        <AppRouter />
      </QueryClientProvider>
    </>
  );
}

export default App;
