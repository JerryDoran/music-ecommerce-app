import Layout from '../components/Layout';
import { CartContextProvider } from '../context/CartContext';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </CartContextProvider>
  );
}

export default MyApp;
