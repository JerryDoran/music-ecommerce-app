import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import Cart from './Cart';
import { useCartContext } from '../context/CartContext';

export default function Navbar() {
  const { state, dispatch } = useCartContext();

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Thanos Music</Link>
      </p>
      <button
        type='button'
        className='cart-icon'
        onClick={() => dispatch({ type: 'TOGGLE_CART', payload: true })}
      >
        <AiOutlineShopping />
        <span className='cart-item-qty'>{state.cartItems.length}</span>
      </button>
      {state.toggleCart && <Cart />}
    </div>
  );
}
