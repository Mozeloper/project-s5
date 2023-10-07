import { useQuery } from "react-query"
import { getAllConvertsInNewBelievers } from '../services/admins.api';

export function useFetchNewBelievers({ pageNumber, pageSize, searchquery }) {
    const AllNewBelievers = useQuery(
      [`GetAllNewBelievers`, searchquery, pageNumber],
      async () => await getAllConvertsInNewBelievers({ pageNumber, pageSize, searchquery }),
      {
        staleTime: 360000,
        enabled: !!pageNumber,
        keepPreviousData: true,
      }
    );

    return AllNewBelievers;
}