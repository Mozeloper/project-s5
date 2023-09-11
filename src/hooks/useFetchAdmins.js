
//Todo - use React Query to fetch datas
//Todo - 1. Build hook for all my api calls
//Todo - 2. add React Query to the root/app.js so it children can be accessible through the entire app
//Todo - 3. when building also make provision for pagination

import { useQuery } from "react-query"
import { getAllAdmins } from "../services/admins.api";

export function useFetchAdmins() {
    const admins = useQuery([`admins`], async () => await getAllAdmins, {
        staleTime: 360000,
    });
    return admins
}

