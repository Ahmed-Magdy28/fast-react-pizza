import { useRouteError } from 'react-router';
import type { useRouteErrorType } from '../types';
import LinkButton from './LinkButton';

export function Error() {
   const error = useRouteError() as useRouteErrorType;
   return (
      <div>
         <h1>Something went wrong 😢</h1>

         <p>{`${error?.status ? error?.status : ''} ${error?.data || error.message}`}</p>

         <LinkButton to={'-1'}>&larr; Go back</LinkButton>
      </div>
   );
}
