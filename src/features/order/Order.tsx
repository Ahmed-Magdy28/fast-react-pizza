// Test ID: IIDSAT
import { useEffect } from 'react';
import { useFetcher, useLoaderData } from 'react-router';

import {
   calcMinutesLeft,
   formatCurrency,
   formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';
import type { item, OrderType, Pizza } from '../../types';
import { useAppDispatch } from '../../store';
import { clearCart } from '../cart/cartSlice';
import UpdateOrder from './UpdateOrder';

function Order() {
   // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
   const order: OrderType = useLoaderData();
   const dispatch = useAppDispatch();

   const fetcher = useFetcher();

   useEffect(
      function () {
         if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
      },
      [fetcher],
   );

   const {
      // id,
      // status,
      priority,
      priorityPrice,
      orderPrice,
      estimatedDelivery,
      cart,
   } = order;
   const deliveryIn = calcMinutesLeft(estimatedDelivery);

   useEffect(() => {
      dispatch(clearCart());
   }, [dispatch]);

   return (
      <div className="space-y-8 px-4 py-6">
         <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">Status</h2>

            <div className="space-x-2">
               {priority && (
                  <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold tracking-wide text-red-50 uppercase">
                     Priority
                  </span>
               )}
               <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold tracking-wide text-green-50 uppercase">
                  {status} order
               </span>
            </div>
         </div>

         <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
            <p className="font-medium">
               {deliveryIn >= 0
                  ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
                  : 'Order should have arrived'}
            </p>
            <p className="text-xs text-stone-500">
               (Estimated delivery: {formatDate(estimatedDelivery)})
            </p>
         </div>

         <ul className="dive-stone-200 divide-y border-t border-b">
            {cart.map((item: item) => (
               <OrderItem
                  item={item}
                  key={item.pizzaId}
                  isLoadingIngredients={fetcher.state === 'loading'}
                  ingredients={
                     fetcher?.data?.find(
                        (pizza: Pizza) => pizza.id === item.pizzaId,
                     )?.ingredients
                  }
               />
            ))}
         </ul>

         <div className="space-y-2 bg-stone-200 px-6 py-5">
            <p className="text-sm font-medium text-stone-600">
               Price pizza: {formatCurrency(orderPrice)}
            </p>
            {priority && (
               <p className="text-sm font-medium text-stone-600">
                  Price priority: {formatCurrency(priorityPrice)}
               </p>
            )}
            <p className="font-bold">
               To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
            </p>
         </div>
         {!priority && <UpdateOrder order={order} />}
      </div>
   );
}

export default Order;
