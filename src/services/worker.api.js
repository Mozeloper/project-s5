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

export async function uploadProfileImage(imgUrl) {
  try {
    const formData = new FormData();
    formData.append('file', imgUrl);

    const updateProfile = await api.post(
      `${baseUrl}${appUrls.UPDATE_PROFILE_IMG}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (updateProfile?.status === 200) {
      toast.success('Profile was Updated successfully');
    }
    const updatedProfileRes = updateProfile?.data;
    return updatedProfileRes;
  } catch (error) {
    toast.error('Opps! Could not update profile image, please try again');
    throw new Error(error.message || error);
  }
}

export async function reactivateAWorker(workerId) {
  try {
    const reactivedWorker = await api.post(
      `${baseUrl}${appUrls.REACTIVATE_A_WORKER}/?workerId=${workerId}`
    );
    if (reactivedWorker?.status === 200) {
      toast.success('Worker was reinstated successfully');
    }
    const reactivatedWorkerRes = reactivedWorker?.data;
    return reactivatedWorkerRes;
  } catch (error) {
    toast.error('Opps! Your request was unsuccesful, please try again');
    throw new Error(error.message || error);
  }
}

export async function deleteWorkerById(workerId) {
  try {
    const deletedWorker = await api.post(
      `${baseUrl}${appUrls.DELETE_A_WORKER}/?workerId=${workerId}`
    );
    if (deletedWorker?.status === 200) {
      toast.success('Worker was delete successfully');
    }
    const deletedWorkerRes = deletedWorker?.data;
    return deletedWorkerRes;
  } catch (error) {
    toast.error('Opps! Your request was unsuccesful, please try again');
    throw new Error(error.message || error);
  }
}

export async function exportAllWorkers() {
  try {
    const exportedWorkers = await api.get(
      `${appUrls?.EXPORT_ALL_WORKERS}`,
      {responseType: 'blob'} // Specify the response type as blob
    );
    const exportedWorkersRes = await exportedWorkers;
    //console.log(exportedWorkersRes);
    // Create a Blob object from the response data
    const blob = new Blob([exportedWorkersRes.data]);

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');

    // Set the href attribute to the URL of the Blob
    link.href = url;

    // Set the download attribute to specify the filename
    link.setAttribute('download', 'AllExportedWorkersData.xlsx'); // the desired filename

    // Append the link to the document body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Cleanup: remove the link and revoke the URL
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    //return exportedConvertsRes;
  } catch (error) {
    throw new Error(error.message || error);
  }
}