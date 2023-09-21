import { useQuery } from "react-query"
import { getAllConvertsInNewBelievers } from '../services/admins.api';

export function useFetchNewBelievers({ pageNumber, pageSize }) {
    const AllNewBelievers = useQuery(
      [`GetAllNewBelievers`, pageNumber],
      async () => await getAllConvertsInNewBelievers({ pageNumber, pageSize }),
      {
        staleTime: 360000,
        enabled: !!pageNumber,
        keepPreviousData: true,
      }
    );

    return AllNewBelievers;
}