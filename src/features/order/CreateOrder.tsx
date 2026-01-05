// https://uibakery.io/regex-library/phone-number

import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router';
import { createOrder } from '../../services/apiRestaurant';
import type { CartITem, OrderType } from '../../types';
import { formatCurrency, isValidPhone } from '../../utils/helpers';
import Button from '../../ui/Button';
import type { RootStateType } from '../../types';
import EmptyCart from '../cart/EmptyCart';
import { useAppDispatch } from '../../store';
import { fetchAddress } from '../user/userSlice';

export default function CreateOrder() {
   const {
      username,
      address,
      status: addressStatus,
      position,
      error: addressError,
   } = useSelector((state: RootStateType) => state.user);
   const isLoadingAddress = status === 'loading';
   const dispatch = useAppDispatch();
   const navigation = useNavigation();
   const isSubmitting = navigation.state === 'submitting';
   const formErrors = useActionData() as { phone?: string } | undefined;
   const [withPriority, setWithPriority] = useState(false);
   const cart = useSelector((state: RootStateType) => state.cart.cart);
   const totalCartPrice = useSelector((state: RootStateType) =>
      state.cart.cart.reduce(
         (sum: number, item: CartITem) => sum + item.totalPrice,
         0,
      ),
   );
   // const address = useSelector((state: RootStateType) => state.user.address);
   const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
   const totalprice = totalCartPrice + priorityPrice;

   if (!cart.length) return <EmptyCart />;

   function handleGetPostion(e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      dispatch(fetchAddress());
   }

   return (
      <div className="px-4 py-6">
         <h2 className="mb-8 text-xl font-semibold">
            Ready to order? Let&apos;s go!
         </h2>

         <Form method="POST">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
               <label className="sm:basis-40">First Name</label>
               <input
                  className="input grow"
                  title="firstName"
                  type="text"
                  name="customer"
                  defaultValue={username}
                  required
               />
            </div>

            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
               <label className="sm:basis-40">Phone number</label>
               <div className="grow">
                  <input
                     className="input w-full"
                     title="phoneNumber"
                     type="tel"
                     name="phone"
                     required
                  />
               </div>
               {formErrors?.phone && (
                  <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                     {formErrors.phone}
                  </p>
               )}
            </div>

            <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
               <label className="sm:basis-40">Address</label>
               <div className="grow">
                  <input
                     className="input w-full"
                     title="address"
                     type="text"
                     name="address"
                     disabled={isLoadingAddress}
                     defaultValue={address}
                     required
                  />
               </div>

               {addressStatus === 'failed' && (
                  <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 md:absolute md:top-10 md:right-25 md:pr-40 md:pl-40">
                     {addressError}
                  </p>
               )}

               {!position && (
                  <span className="absolute top-8.75 right-1 z-50 sm:top-1.25">
                     <Button
                        type="small"
                        onClick={handleGetPostion}
                        disabled={isLoadingAddress}
                     >
                        Get position
                     </Button>
                  </span>
               )}
            </div>

            <div className="mb-12 flex items-center gap-5 md:pt-8">
               <input
                  className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
                  type="checkbox"
                  name="priority"
                  id="priority"
                  value={String(withPriority)}
                  onChange={(e) => setWithPriority(e.target.checked)}
               />
               <label htmlFor="priority" className="font-medium">
                  Want to give your order priority?
               </label>
            </div>

            <div>
               <input type="hidden" name="cart" value={JSON.stringify(cart)} />
               <input
                  type="hidden"
                  name="position"
                  value={
                     position?.latitude && position?.longitude
                        ? `${position.latitude},${position.longitude}`
                        : ''
                  }
               />
               <Button disabled={isSubmitting} type="primary">
                  {isSubmitting || isLoadingAddress
                     ? 'Placing order.....'
                     : `Order now from ${formatCurrency(totalprice)}`}
               </Button>
            </div>
         </Form>
      </div>
   );
}

export async function CreateOrderAction({ request }: { request: Request }) {
   const formData = await request.formData();
   const data = Object.fromEntries(formData);
   const order = {
      ...data,
      cart: JSON.parse(String(data.cart)),
      priority: data.priority === 'true',
   };
   const fixOrder = order as OrderType;
   const errors: { phone?: string } = {};
   if (!isValidPhone(fixOrder.phone))
      errors.phone =
         'Please give us your correct phone number. We Might need to contact you';
   if (Object.keys(errors).length > 0) return errors;
   // if no errors, create new order and redirect
   const newOrder: OrderType = await createOrder(order);
   return redirect(`/order/${newOrder.id}`);
}
