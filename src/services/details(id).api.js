import { api } from './api';
import { appUrls } from './urls';

export async function getAWorkerAdmin(workerId) {
  try {
    const Workersadmins = await api.get(
      `${appUrls.GET_WORKER_DETAILS}/${workerId}`
    );
    const fetchWorkersAdmins = await Workersadmins?.data?.Data;
    return await fetchWorkersAdmins;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getDeactivatedWorker(workerId) {
  try {
    const deactivatedWorker = await api.get(
      `${appUrls.GET_DEACTIVATED_WORKER_DETAILS}/${workerId}`
    );
    const deactivatedWorkerRes = await deactivatedWorker?.data?.Data;
    return await deactivatedWorkerRes;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getUnapprovedWorker(workerId) {
  try {
    const unapprovedWorker = await api.get(
      `${appUrls.GET_UNAPPROVED_WORKERDETAILS}/${workerId}`
    );
    const fetchUnapprovedWorker = await unapprovedWorker?.data?.Data;
    return await fetchUnapprovedWorker;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getASoul(soulId) {
  try {
    const souls = await api.get(
      `${appUrls.GET_CONVERT_DETAILS}/${soulId}`
    );
    const fetchSouls = await souls?.data?.Data;
    return await fetchSouls;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAAdmin(adminId) {
  try {
    const admins = await api.get(`${appUrls.GET_ADMIN_DETAILS}/${adminId}`);
    const fetchadmins = await admins?.data?.Data;
    return await fetchadmins;
  } catch (error) {
    throw new Error(error.message || error);
  }
}
