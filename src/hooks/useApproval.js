import { useMutation, useQuery } from "react-query";
import {
  approveAWorker,
  getAllDeactivatedWorker,
  getAllUnApproval,
  deleteAWorker,
  getAllDeactivatedNewConvert,
} from "../services/approval.api";
import { getUnapprovedWorker } from "../services/details(id).api";
import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getUnApprovalCount } from "../services/admins.api";

//Quary / fetcher functions
const queryClient = new QueryClient();
export function useFetchAllUnapproved({ pageNumber, pageSize, searchquery }) {
  const UnApproval = useQuery(
    [`UnApproval`, searchquery, pageNumber],
    async () => await getAllUnApproval({ pageNumber, pageSize, searchquery }),
    {
      staleTime: 360000,
      enabled: !!pageNumber,
    }
  );
  return UnApproval;
}

export function useFetchUnapprovedCount() {
  const UnApproval = useQuery(
    ['UnApprovedWorkersCount'],
    async () => await getUnApprovalCount(),
  );
  return UnApproval;
}

export function useFetchAllDeactivatedWorker({ pageNumber, pageSize, searchquery }) {
  const DeactivatedWorker = useQuery(
    [`DeactivatedWorker`, searchquery, pageNumber],
    async () => await getAllDeactivatedWorker({ pageNumber, pageSize, searchquery }),
    {
      staleTime: 360000,
      enabled: !!pageNumber,
    }
  );
  return DeactivatedWorker;
}

export function useFetchAllDeactivatedNewConvert({ pageNumber, pageSize, searchquery }) {
  const DeactivatedWorker = useQuery(
    [`DeactivatedNewConvert`, searchquery, pageNumber],
    async () => await getAllDeactivatedNewConvert({ pageNumber, pageSize, searchquery }),
    {
      staleTime: 360000,
      enabled: !!pageNumber,
    }
  );
  return DeactivatedWorker;
}

export function useFetchUnapprovedWorkerDetails({ workerId }) {
  const unapprovedWorker = useQuery({
    queryKey: ["UnapprovedWorker", workerId],
    queryFn: async () => await getUnapprovedWorker(workerId),
    staleTime: 360000,
    enabled: !!workerId, //Only run this function if workerId is available
  });
  return unapprovedWorker;
}



//Mutation / post functions

export function usePostApproveWorker(workerId, pageNumber) {
  //todo - workerId is not seen on first try
  const approval = useMutation({
    mutationFn: async () => await approveAWorker(workerId),
    onSuccess: async () => {
      queryClient.invalidateQueries([`UnApproval`, pageNumber]);
      toast.success(`Congratulation: New worker approved`);
    },
    onError: async () => {
      queryClient.invalidateQueries([`UnApproval`, pageNumber]);
      toast.error(`Opps: An error occurred, Try Again Later`);
    },
  });
  return approval;
}

export function usePostDeleteWorker(workerId, pageNumber) {
  const deletion = useMutation({
    mutationFn: async () => await deleteAWorker(workerId),
    onSuccess: async () => {
      queryClient.invalidateQueries([`UnApproval`, pageNumber]);
      toast.success(`Worker Deleted`);
    },
    onError: async () => {
      queryClient.invalidateQueries([`UnApproval`, pageNumber]);
      toast.error(`Opps: An error occurred, Try Again Later`);
    },
  });
  return deletion;
}
