import { useQuery } from "react-query"
import { getAllConvertsInNewBelievers, getAllDTIAdminNames } from '../services/admins.api';


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

export function useDTIAdminNames(nameQuery) {
  const dtiAdminNames = useQuery(['DTIAdminNames'], async () => await getAllDTIAdminNames(nameQuery), {
      enabled: !!nameQuery,  //The enabled property allows only a boolean, then wait till id is not undefined or null
      keepPreviousData: true
  });
  return dtiAdminNames;
}