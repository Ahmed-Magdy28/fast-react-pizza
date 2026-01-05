import type { ReactNode } from 'react';
import ItemControlButton from './ItemControlButton';
export default function UpdateItemQuantity({
   pizzaId,
   children,
   currentQuantity,
}: {
   pizzaId: number;
   currentQuantity: number;
   children?: ReactNode;
}) {
   return (
      <div className="a flex items-center gap-2 md:gap-3">
         <ItemControlButton pizzaId={pizzaId} type="decrease" />
         <span className="text-sm font-medium">{currentQuantity}</span>
         {children}
         <ItemControlButton pizzaId={pizzaId} type="increase" />
      </div>
   );
}
