import { useMutation, useQuery } from "react-query"
import { approveAWorker, getAllDeactivatedWorker, getAllUnApproval } from "../services/approval.api";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient()
export function useFetchAllUnapproved() {
    const UnApproval = useQuery([`UnApproval`], async () => await getAllUnApproval(), {
        staleTime: 360000,
        enabled: true,
    });
    return UnApproval
}


export function useFetchAllDeactivatedWorker() {
    const DeactivatedWorker = useQuery([`DeactivatedWorker`], async () => await getAllDeactivatedWorker(), {
        staleTime: 360000,
    });
    return DeactivatedWorker
}


export function usePostApproveWorker(workerId) {
    //todo - workerId is not seen on first try
   const approval = useMutation({
   mutationFn: async () => await approveAWorker(workerId),
   onSuccess: async (data) => {
    queryClient.invalidateQueries('UnApproval')
   }
 })
    return approval
}
