import { useQuery } from "react-query"
import { getAllMinistryAdmins } from "../services/admins.api";

export function useFetchMinistry({ pageNumber, pageSize }) {
    const Ministers = useQuery(
      ['GetAllMinisters', pageNumber],
      async () => await getAllMinistryAdmins({ pageNumber, pageSize }),
      {
        staleTime: 360000,
        enabled: !!pageNumber,
        keepPreviousData: true,
      }
    );

    return Ministers;
}