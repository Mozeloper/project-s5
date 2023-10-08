import { useQuery } from "react-query"
import { getAllConvertsInDti } from '../services/admins.api';

// todo - add getAlldti fetch call function
export function useFetchDti() {
  const DtiConverts = useQuery(
    ['DtiConverts'],
    async () => await getAllConvertsInDti(),
    {
      staleTime: 360000,
      enabled: true,
    }
  );
  return DtiConverts;
}


