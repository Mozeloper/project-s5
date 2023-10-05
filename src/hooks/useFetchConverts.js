import { useMutation, useQuery } from 'react-query';
import { reactivateAConvert, deleteAConvert } from '../services/souls';
import { QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getAllDeactivatedNewConvert } from '../services/approval.api';

//Quary / fetcher functions
const queryClient = new QueryClient();

export function useFetchAllDeactivatedNewConvert({ pageNumber, pageSize }) {
  const DeactivatedWorker = useQuery(
    [`DeactivatedConverts`, pageNumber],
    async () => await getAllDeactivatedNewConvert({ pageNumber, pageSize }),
    {
      staleTime: 360000,
      enabled: !!pageNumber,
    }
  );
  return DeactivatedWorker;
}

//Mutation / post functions
export function usePostReactivateConvert(convertId, pageNumber) {
  //todo - workerId is not seen on first try
  const reactivatedConvert = useMutation({
    mutationFn: async () => await reactivateAConvert(convertId),
    onSuccess: async () => {
      queryClient.invalidateQueries([`DeactivatedConverts`, pageNumber]);
      toast.success(`Congratulation: Convert has been reinstated`);
    },
    onError: async () => {
      queryClient.invalidateQueries([`DeactivatedConverts`, pageNumber]);
      toast.error(`Opps: An error occurred, Try Again Later`);
    },
  });
  return reactivatedConvert;
}

export function usePostDeleteConvert(convertId, reason) {
  const deletedConvert = useMutation({
    mutationFn: async () => await deleteAConvert(convertId, reason),
    onSuccess: async () => {
      queryClient.invalidateQueries([`DeactivatedConverts`, pageNumber]);
      toast.success(`Convert has been Permanently Deleted`);
    },
    onError: async () => {
      queryClient.invalidateQueries([`DeactivatedConverts`, pageNumber]);
      toast.error(`Opps: An error occurred, Try Again Later`);
    },
  });
  return deletedConvert;
}
