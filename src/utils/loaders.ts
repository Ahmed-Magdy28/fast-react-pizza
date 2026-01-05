import type { LoaderFunctionArgs } from 'react-router';
import { getMenu, getOrder } from '../services/apiRestaurant';

export async function menuLoader() {
   const menu = await getMenu();
   return menu;
}

export async function orderLoader({
   params,
}: {
   params: LoaderFunctionArgs<unknown>['params'];
}) {
   const { orderId } = params;
   if (!orderId) throw Error('No order ID provided');
   const order = await getOrder(orderId);
   return order;
}
