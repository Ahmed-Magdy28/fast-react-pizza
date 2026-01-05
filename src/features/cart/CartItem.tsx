import { useSelector } from 'react-redux';
import type { CartITem, RootStateType } from '../../types';
import { formatCurrency } from '../../utils/helpers';
import ItemControlButton from './ItemControlButton';
import UpdateItemQuantity from './UpdateItemQuantity';

function CartItem({ item }: { item: CartITem }) {
   const { pizzaId, name, quantity, totalPrice } = item;
   const currentQuantity =
      useSelector(
         (state: RootStateType) =>
            state.cart.cart.find((item: CartITem) => item.pizzaId === pizzaId)
               ?.quantity,
      ) ?? 0;

   return (
      <li className="py-3 sm:flex sm:items-center sm:justify-between">
         <p className="mb-1 sm:mb-0">
            {quantity}&times; {name}
         </p>
         <div className="flex items-center justify-between sm:gap-6">
            <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
            <UpdateItemQuantity
               pizzaId={item.pizzaId}
               currentQuantity={currentQuantity}
            />
            <ItemControlButton pizzaId={item.pizzaId} type="delete" />
         </div>
      </li>
   );
}

export default CartItem;
