import { useMutation, useQuery } from "react-query"
import { approveAWorker, getAllDeactivatedWorker, getAllUnApproval } from "../services/approval.api";

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


export function usePostApproveWorker(userId) {
    const approval = useMutation({
   mutationFn: async (newTodo) => await approveAWorker(userId),
   onSuccess: async (data) => {
    console.log('userId', userId);
    console.log('data', await data);
   }
 })

    return approval
}