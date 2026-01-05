import { useLoaderData } from 'react-router';
import MenuItem from './MenuItem';
import type { Pizza } from '../../types';

function Menu() {
   const menu = useLoaderData();
   return (
      <>
         <ul className="divide-y divide-stone-200 px-2">
            {menu.map((Pizza: Pizza) => (
               <MenuItem pizza={Pizza} key={Pizza.id} />
            ))}
         </ul>
      </>
   );
}

export default Menu;
