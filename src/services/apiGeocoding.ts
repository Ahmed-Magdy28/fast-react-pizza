import { API_Geocoding_URL } from '../utils/config';

export async function getAddress({
   latitude,
   longitude,
}: {
   latitude: string | number;
   longitude: string | number;
}) {
   const res = await fetch(
      `${API_Geocoding_URL}?latitude=${latitude}&longitude=${longitude}`,
   );
   if (!res.ok) throw Error('Failed getting address');

   const data = await res.json();
   return data;
}
