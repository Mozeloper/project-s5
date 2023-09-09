import { useQuery } from "react-query"
import { getAllDtiAdmins } from "../services/admins.api";

// todo - add getAlldti fetch call function
export function useFetchDti() {
    const Dti = useQuery([`Dti`], async () => await getAllDtiAdmins(), {
        staleTime: 360000,
    });
    return Dti
}