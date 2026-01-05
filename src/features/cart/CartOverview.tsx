import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import type { CartITem, RootStateType } from '../../types';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
   const totalCartPrice = useSelector((state: RootStateType) =>
      state.cart.cart.reduce(
         (sum: number, item: CartITem) => sum + item.totalPrice,
         0,
      ),
   );
   const totalCartQuantity = useSelector((state: RootStateType) =>
      state.cart.cart.reduce(
         (sum: number, item: CartITem) => sum + item.quantity,
         0,
      ),
   );

   if (totalCartQuantity === 0) return null;
   return (
      <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base">
         <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
            <span>{totalCartQuantity && `${totalCartQuantity} pizzas`}</span>
            <span>{totalCartPrice && `${formatCurrency(totalCartPrice)}`}</span>
         </p>
         <Link to="/cart">Open cart 🛒 &rarr;</Link>
      </div>
   );
}

export default CartOverview;
