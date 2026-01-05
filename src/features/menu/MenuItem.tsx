import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import type { CartITem, Pizza } from '../../types';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem } from '../cart/cartSlice';
import type { RootStateType } from '../../types';
import ItemControlButton from '../cart/ItemControlButton';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }: { pizza: Pizza }) {
   const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
   const dispatch = useAppDispatch();
   const currentQuantity =
      useSelector(
         (state: RootStateType) =>
            state.cart.cart.find((item: CartITem) => item.pizzaId === id)
               ?.quantity,
      ) ?? 0;
   const isInCart = currentQuantity > 0;
   function handleAddItemCart() {
      const newCartITem = {
         pizzaId: id,
         name: name,
         quantity: 1,
         unitPrice: unitPrice,
         totalPrice: unitPrice,
      };
      dispatch(addItem(newCartITem));
   }

   return (
      <li className="flex gap-4 py-2">
         <img
            src={imageUrl}
            alt={name}
            className={`h-24 ${soldOut && 'opacity-70 grayscale'}`}
         />
         <div className="flex grow flex-col pt-0.5">
            <p className="font-medium">{name}</p>
            <p className="text-sm text-stone-500 capitalize italic">
               {ingredients.join(', ')}
            </p>
            <div className="mt-auto flex items-center justify-between">
               {!soldOut ? (
                  <p className="text-sm">{formatCurrency(unitPrice)}</p>
               ) : (
                  <p className="text-sm">Sold out</p>
               )}
               {isInCart && (
                  <div className="flex items-center gap-3 sm:gap-8">
                     <UpdateItemQuantity
                        pizzaId={id}
                        currentQuantity={currentQuantity}
                     />

                     <ItemControlButton pizzaId={id} type="delete" />
                  </div>
               )}
               {!soldOut && !isInCart && (
                  <Button type="primary" onClick={handleAddItemCart}>
                     add to cart
                  </Button>
               )}
            </div>
         </div>
      </li>
   );
}

export default MenuItem;
