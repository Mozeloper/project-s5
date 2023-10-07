import { useQuery } from "react-query"
import { getAllConvertsInDti } from '../services/admins.api';

// todo - add getAlldti fetch call function
export function useFetchDti({ pageNumber, pageSize, searchquery }) {
  const DtiConverts = useQuery(
    [`DtiConverts`, searchquery, pageNumber],
    async () => await getAllConvertsInDti({ pageNumber, pageSize, searchquery }),
    {
      staleTime: 360000,
      enabled: true,
    }
  );
  return DtiConverts;
}


