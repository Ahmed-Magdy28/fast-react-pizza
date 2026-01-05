import { API_Restaurant_URL } from '../utils/config';

export async function getMenu() {
   const res = await fetch(`${API_Restaurant_URL}/menu`);

   // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
   if (!res.ok) throw Error('Failed getting menu');

   const { data } = await res.json();
   return data;
}

export async function getOrder(id: string | number) {
   const res = await fetch(`${API_Restaurant_URL}/order/${id}`);
   if (!res.ok) throw Error(`Couldn't find order #${id}`);

   const { data } = await res.json();
   return data;
}

export async function createOrder(newOrder: unknown) {
   try {
      const res = await fetch(`${API_Restaurant_URL}/order`, {
         method: 'POST',
         body: JSON.stringify(newOrder),
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (!res.ok) throw Error();
      const { data } = await res.json();
      return data;
   } catch {
      throw Error('Failed creating your order');
   }
}

export async function updateOrder(id: unknown, updateObj: unknown) {
   try {
      const res = await fetch(`${API_Restaurant_URL}/order/${id}`, {
         method: 'PATCH',
         body: JSON.stringify(updateObj),
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (!res.ok) throw Error();
      // We don't need the data, so we don't return anything
   } catch (error) {
      const err = error as Error;
      throw Error('Failed updating your order', err);
   }
}
