import { useQuery } from 'react-query';
import { getAllWorkersAdmins, getAllWorkersNames } from '../services/admins.api';
import {
  getAWorkerAdmin,
  getDeactivatedWorker,
} from '../services/details(id).api';

export function useWorkersAdmins({ pageNumber, pageSize, searchquery }) {
    const admins = useQuery([`workers`, searchquery, pageNumber], async () => await getAllWorkersAdmins({ pageNumber, pageSize, searchquery }), {
        staleTime: 360000,
        enabled: !!pageNumber,  //The enabled property allows only a boolean, then wait till id is not undefined or null
        keepPreviousData: true
    });
    return admins
}

export function useWorkersNames() {
  const adminsNames = useQuery([`workers`], async () => await getAllWorkersNames(), {
      staleTime: 360000,
      // enabled: !!pageNumber,  //The enabled property allows only a boolean, then wait till id is not undefined or null
      keepPreviousData: true
  });
  return adminsNames
}

export function useWorkerDetails({ workerId }) {
  // console.log('singleWorker workerId', workerId);
  const singleWorker = useQuery({
    queryKey: ['worker', workerId],
    queryFn: async () => await getAWorkerAdmin(workerId),
    staleTime: 360000,
    enabled: !!workerId, //Only run this function if workerId is available
  });
  return singleWorker;

}
export function useDeactivatedWorkerDetails({ workerId }) {
  const deactivatedWorker = useQuery({
    queryKey: ['DeactivatedWorker', workerId],
    queryFn: async () => await getDeactivatedWorker(workerId),
    staleTime: 360000,
    enabled: !!workerId, //Only run this function if workerId is available
  });
  return deactivatedWorker;
}
