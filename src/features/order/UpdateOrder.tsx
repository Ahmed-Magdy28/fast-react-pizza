/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFetcher, type Params } from 'react-router';
import type { OrderType } from '../../types';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

// HHAW1Y
export default function UpdateOrder({ order }: { order: OrderType }) {
   const fetcher = useFetcher();

   return (
      <fetcher.Form method="patch" className="text-right">
         <Button type="primary">Make Priority</Button>
      </fetcher.Form>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({
   request,
   params,
}: {
   request?: Request;
   params: Params<string>;
}) {
   const data = { priority: true };
   await updateOrder(params.orderId!, data);
   return null;
}
