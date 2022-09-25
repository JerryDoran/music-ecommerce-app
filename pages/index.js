import Head from 'next/head';
import HeroBanner from '../components/HeroBanner';
import Product from '../components/Product';
import FooterBanner from '../components/FooterBanner';
import { client } from '../lib/client';

export default function Home({ products, bannerData }) {
  return (
    <>
      <Head>
        <title>Ecommerce App</title>
        <meta name='description' content='Ecommerce electronics store' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}

export const getServerSideProps = async () => {
  // grap all of the products from my sanity dashboard
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
    },
  };
};
