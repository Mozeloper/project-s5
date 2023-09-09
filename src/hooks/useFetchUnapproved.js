import { useQuery } from "react-query"
import { getAllDeactivatedWorker, getAllUnApproval } from "../services/approval.api";

export function useFetchAllUnapproved() {
    const UnApproval = useQuery([`UnApproval`], async () => await getAllUnApproval(), {
        staleTime: 360000,
    });
    return UnApproval
}


export function useFetchAllDeactivatedWorker() {
    const DeactivatedWorker = useQuery([`DeactivatedWorker`], async () => await getAllDeactivatedWorker(), {
        staleTime: 360000,
    });
    return DeactivatedWorker
}