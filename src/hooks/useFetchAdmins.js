
//Todo - use React Query to fetch datas
//Todo - 1. Build hook for all my api calls
//Todo - 2. add React Query to the root/app.js so it children can be accessible through the entire app
//Todo - 3. when building also make provision for pagination

import { useQuery } from "react-query"
import { getAllAdmins } from "../services/admins.api";

export function useFetchAdmins({ pageNumber, totalPerPage }) {
    const admins = useQuery([`admins page `, pageNumber, ' total of ', totalPerPage], async () => await getAllAdmins({ pageNumber, totalPerPage }), {
        staleTime: 360000,
        enabled: !!pageNumber,  //The enabled property allows only a boolean, then wait till id is not undefined or null
        keepPreviousData: true
    });
    return admins
}

