import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useCartContext } from '../context/CartContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
import toast from 'react-hot-toast';

export default function Cart() {
  const [subTotal, setSubTotal] = useState(0);
  const {
    state: { cartItems },
    dispatch,
  } = useCartContext();

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (acc, curr) => acc + Number(curr.price) * curr.qty,
      0
    );
    setSubTotal(totalPrice);
  }, [cartItems]);

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    console.log(data);

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => dispatch({ type: 'TOGGLE_CART', payload: false })}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({cartItems.length} items)</span>
        </button>

        <div className='product-container'>
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className='product' key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  alt={item.name}
                  className='cart-product-image'
                />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className='cart-quantity-heading'>Quantity</p>
                      <select
                        className='num'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch({
                            type: 'CHANGE_CART_QTY',
                            payload: {
                              id: item._id,
                              qty: Number(e.target.value),
                            },
                          })
                        }
                      >
                        {[...Array(1, 2, 3, 4, 5, 6, 7, 8, 9)].map((_, i) => (
                          <option key={i}>{i + 1}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      className='remove-item'
                      type='button'
                      onClick={() =>
                        dispatch({ type: 'REMOVE_FROM_CART', payload: item })
                      }
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
                {cartItems.length >= 1 && (
                  <div className='cart-bottom'>
                    <div className='total'>
                      <h3>Subtotal</h3>
                      <h3>${subTotal}</h3>
                    </div>
                    <div className='btn-container'>
                      <button
                        className='btn'
                        type='button'
                        onClick={handleCheckout}
                      >
                        Pay with Stripe
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          {cartItems.length < 1 && (
            <div className='empty-cart'>
              <AiOutlineShopping size={150} />
              <h3>Your Shopping bag is empty</h3>
              <Link href='/'>
                <button
                  type='button'
                  className='btn'
                  onClick={() =>
                    dispatch({ type: 'TOGGLE_CART', payload: false })
                  }
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
