import '../styles/globals.css';
import '../components/Loader.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import '../node_modules/slick-carousel/slick/slick.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '../store';
import { SessionProvider } from 'next-auth/react';
//deploy
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
