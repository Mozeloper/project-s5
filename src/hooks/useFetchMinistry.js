import { useQuery } from "react-query"
import { getAllMinistryAdmins } from "../services/admins.api";

export function useFetchMinistry({ pageNumber, pageSize, searchquery }) {
    const Ministers = useQuery(
      [`GetAllMinisters`, searchquery, pageNumber],
      async () => await getAllMinistryAdmins({ pageNumber, pageSize, searchquery }),
      {
        staleTime: 360000,
        enabled: !!pageNumber,
        keepPreviousData: true,
      }
    );

    return Ministers;
}