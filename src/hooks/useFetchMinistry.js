import { useQuery } from "react-query"
import { getAllMinistryAdmins } from "../services/admins.api";

// todo - add getAllMinistry fetch call function
export function useFetchMinistry() {
    const Ministry = useQuery([`Ministry`], async () => await getAllMinistryAdmins(), {
        staleTime: 360000,
    });
    return Ministry
}