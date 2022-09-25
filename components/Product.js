/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { urlFor } from '../lib/client';

export default function Product({ product: { image, name, slug, price } }) {
  return (
    <div>
      <Link href={`/products/${slug.current}`}>
        <div className='product-card'>
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            alt='headphones'
            className='product-image'
          />
          <p className='product-name'>{name}</p>
          <p className='product-name'>${price}</p>
        </div>
      </Link>
    </div>
  );
}
