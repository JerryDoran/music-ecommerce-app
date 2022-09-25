import { createContext, useContext, useReducer } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

const initialState = {
  toggleCart: false,
  cartItems: [],
  price: 0,
  qty: 1,
  totalQuantities: 0,
  toastMessage: '',
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, qty: 1 }],
        toastMessage: toast.success(
          `${state.qty} ${action.payload.name} added to the cart.`
        ),
      };
    case 'REMOVE_FROM_CART':
      console.log('CartContext - Remove From Cart:', action.payload);
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
        totalQuantities: 0,
        price: 0,
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        toggleCart: action.payload,
      };
    case 'CHANGE_CART_QTY':
      // console.log('CartContext - Change Cart Qty:', action.payload);
      return {
        ...state,
        cartItems: state.cartItems.filter((item) =>
          item._id === action.payload.id
            ? (item.qty = action.payload.qty)
            : item.qty
        ),
      };
    default:
      state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
