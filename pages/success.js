import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useCartContext } from '../context/CartContext';
import { runFireworks } from '../lib/utils';

export default function Success() {
  const { state, dispatch } = useCartContext();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    localStorage.clear();
    dispatch({ type: 'CLEAR_CART' });
    runFireworks();
  }, []);

  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon'>
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className='email-msg'>Check your email for the receipt</p>
        <p className='description'>
          If you have any questions please email{' '}
          <a href='mailto:orders@example.com' className='email'>
            orders@example.com
          </a>
        </p>
        <Link href='/'>
          <button type='button' width='100px' className='btn'>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
