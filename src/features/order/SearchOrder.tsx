import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';

export default function SearchOrder() {
   const [query, setQuery] = useState('');
   const navigate = useNavigate();

   function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault();
      if (!query) return;
      navigate(`/order/${query}`);
      setQuery('');
   }

   return (
      <>
         <form action="" onSubmit={handleSubmit}>
            <input
               type="text"
               placeholder="Search Order"
               className="focus:ring-opacity-50 w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:ring focus:ring-yellow-500 focus:outline-none sm:w-64 sm:focus:w-72"
               value={query}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setQuery(e.target.value);
               }}
            />
         </form>
      </>
   );
}
