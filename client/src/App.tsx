import React from 'react';
import { Global } from '@emotion/react';
import { AppRouter } from './router/AppRouter';
import { globalStyle } from './_libs/design/globalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ModalProvider } from '@syyu/util/react';
import { RecoilRoot } from 'recoil';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ModalProvider>
            <Global styles={globalStyle} />
            <AppRouter />
          </ModalProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
