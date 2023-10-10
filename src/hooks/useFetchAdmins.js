import { useQuery } from "react-query"
import { getAllAdmins, getAllSearchAdmins } from "../services/admins.api";
import { getAAdmin } from "../services/details(id).api";

export function useFetchAdmins({ pageNumber, pageSize, searchquery }) {
    const admins = useQuery(['admins', searchquery, pageNumber], async () => await getAllAdmins({ pageNumber, pageSize, searchquery }), {
        staleTime: 360000,
        enabled: !!pageNumber,  //The enabled property allows only a boolean, then wait till id is not undefined or null
        keepPreviousData: true
    });
    return admins
}


export function useSearchedAdmins() {
    const SearchAdmins = useQuery([`admins`], async () => await getAllSearchAdmins(), {
        staleTime: 360000, 
        keepPreviousData: true
    });
    return SearchAdmins
}

export function useAdminDetails({ adminId }) {
    // console.log('singleSoul adminId', adminId);
    const singleAdmin = useQuery({
        queryKey: ['Admin', adminId],
        queryFn: async () => await getAAdmin(adminId),
        staleTime: 360000,
        enabled: !!adminId, //Only run this function if AdminId is available
    })
    return singleAdmin;
}