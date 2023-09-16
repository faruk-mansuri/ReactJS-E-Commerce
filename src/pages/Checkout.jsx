import { useSelector } from 'react-redux';
import { CheckoutForm, SectionTitle, CartTotals } from '../components';
import { Link, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export const loader = (store) => {
  return async () => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warning('You must be logged in for checkout');
      return redirect('/login');
    }
    return null;
  };
};
const Checkout = () => {
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
      <SectionTitle text='place your order' />
      <div className='mt-8 grid gap-8 md:grid-cols-2 items-start'>
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;
