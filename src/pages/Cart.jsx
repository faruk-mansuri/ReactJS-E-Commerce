import { useSelector } from 'react-redux';
import { CartItemsList, SectionTitle, CartTotals } from '../components';
import { Link } from 'react-router-dom';

const CartItem = () => {
  const { user } = useSelector((store) => store.userState);
  const numItemsInCart = useSelector((store) => store.cartState.numItemsInCart);

  if (numItemsInCart === 0) {
    return (
      <>
        <SectionTitle text='Your cart is empty' />
        <div className='flex justify-center mt-12'>
          <Link to='/products' className='btn btn-primary '>
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SectionTitle text='shopping cart' />
      <div className='mt-8 grid gap-8 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4'>
          <CartTotals />
          {user ? (
            <Link to='/checkout' className='btn btn-primary btn-block mt-8'>
              proceed to checkout
            </Link>
          ) : (
            <Link to='/login' className='btn btn-primary btn-block mt-8'>
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default CartItem;
