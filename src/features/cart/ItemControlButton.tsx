import { useAppDispatch } from '../../store';
import Button from '../../ui/Button';
import {
   decreaseItemQuantity,
   deleteItem,
   increaseItemQuantity,
} from './cartSlice';

export default function ItemControlButton({
   pizzaId,
   type,
}: {
   pizzaId: number;
   type: 'delete' | 'increase' | 'decrease';
}) {
   const dispatch = useAppDispatch();
   function handleRemoveItem() {
      dispatch(deleteItem(pizzaId));
   }
   function handleIncrease() {
      dispatch(increaseItemQuantity(pizzaId));
   }
   function handledecrease() {
      dispatch(decreaseItemQuantity(pizzaId));
   }
   if (type === 'delete')
      return (
         <Button type="round" onClick={handleRemoveItem}>
            Delete
         </Button>
      );
   if (type === 'increase')
      return (
         <Button type="round" onClick={handleIncrease}>
            +
         </Button>
      );
   if (type === 'decrease')
      return (
         <Button type="round" onClick={handledecrease}>
            -
         </Button>
      );
   return null;
}
