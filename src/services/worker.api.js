import toast from 'react-hot-toast';
import { axiosRequest } from '../utils/axios-utils';
import { api } from './api';
import { appUrls } from './urls';
const baseUrl = import.meta.env.VITE_BASE_URL;

export async function promoteAWorker(workerId, role) {

  try {
    const promoteWorker = await api.post(
      `${baseUrl}${appUrls.ADD_ROLE_TO_USER}?userId=${workerId}&roles=${role}`
    );
    if (promoteWorker?.status === 200) {
      toast.success('Worker was promted succesfully');
    }
    const promotedWorkerRes = await promoteWorker?.data;
    return promotedWorkerRes;
  } catch (error) {
    toast.error(error.message);
    throw new Error(error.message || error);
  }
}

export async function suspendAWorker(workerId, reason) {
      let payload = {
        id: workerId,
        reasonForDeactivation: reason,
      };
  try {
    const suspendWorker = await api.post(
      `${baseUrl}${appUrls.SUSPEND_A_WORKER}`,
      payload
    );
    if (suspendWorker?.status === 200) {
      toast.success('Worker was suspeneded successfully');
    }
    const suspendedWorkerRes = suspendWorker?.data;
    return suspendedWorkerRes;
  } catch (error) {
    toast.error('Opps! Your request was unsuccesful, please try again');
    throw new Error(error.message || error);
  }
}
