import Head from 'next/head';
import HeroBanner from '../components/HeroBanner';
import Product from '../components/Product';
import FooterBanner from '../components/FooterBanner';

export default function Home() {
  return (
    <>
      <Head>
        <title>Ecommerce App</title>
        <meta name='description' content='Ecommerce electronics store' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HeroBanner />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {['Product 1', 'Product 2'].map((product) => product)}
      </div>
      <FooterBanner />
    </>
  );
}
