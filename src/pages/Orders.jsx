import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import {
  OrdersList,
  ComplexPaginationContainer,
  SectionTitle,
} from '../Components';

const ordersQuery = (params, user) => {
  return {
    queryKey: ['orders', user.username, params.page ? Number(params.page) : 1],
    queryFn: () =>
      customFetch('/orders', {
        params,
        headers: { Authorization: `Bearer ${user.token}` },
      }),
  };
};
export const loader = (store, queryClient) => {
  return async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn('You must logged in to view orders');
      return redirect('/login');
    }

    const params = Object.fromEntries(new URL(request.url).searchParams);

    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );

      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message || 'there was an error';
      toast.error(errorMessage);

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        // if unauthorized user or token is missing
        return redirect('/login');
      }
      return null;
    }
  };
};

const Orders = () => {
  const { meta } = useLoaderData();

  if (meta.pagination.total < 1) {
    return <SectionTitle text='please make an order' />;
  }

  return (
    <>
      <SectionTitle text='Your orders' />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
};

export default Orders;
