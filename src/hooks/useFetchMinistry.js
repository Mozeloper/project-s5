import { useQuery } from "react-query"
import { getAllMinistryAdmins } from "../services/admins.api";

export function useFetchMinistry({ pageNumber }) {
    const Ministry = useQuery([`Ministry`, pageNumber], async () => await getAllMinistryAdmins({ pageNumber }), {
        staleTime: 360000,
        enabled: !!pageNumber,
        keepPreviousData: true
    });

    return Ministry
}