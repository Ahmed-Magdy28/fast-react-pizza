import { useSelector } from 'react-redux';
import type { RootStateType } from '../../types';

export default function UserName() {
   const username = useSelector((state: RootStateType) => state.user.username);
   if (!username) return null;
   return (
      <div className="hidden text-sm font-semibold md:block">{username}</div>
   );
}
