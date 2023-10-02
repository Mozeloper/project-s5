import toast from "react-hot-toast"
import { axiosRequest } from "../utils/axios-utils"
import { api } from "./api"
import { appUrls } from "./urls"
const baseUrl = import.meta.env.VITE_BASE_URL

export async function getAllUnApproval({ pageNumber, pageSize }) {
  try {
    // const UnApproval = await axios.get(`${baseUrl}${appUrls.GET_ALL_UNAPPROVED_WORKERS}`, {
    //     headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}, cache: 'force-cache',
    // })
    // const fetchUnApproval =  await UnApproval?.data
    // return await fetchUnApproval
    const fetchUnApproval = await axiosRequest({
      url: `${appUrls?.GET_ALL_UNAPPROVED_WORKERS}?page=${pageNumber}&pageSize=${pageSize}`,
    });
    return fetchUnApproval?.data;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAllDeactivatedWorker({ pageNumber, pageSize }) {
  try {
    const AllDeactivatedWorker = await axiosRequest({
      url: `${appUrls.GET_ALL_DEACTIVATED_WORKERS}?page=${pageNumber}&pageSize=${pageSize}`,
    });
    return await AllDeactivatedWorker?.data?.Data;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAllDeactivatedNewConvert({ pageNumber, pageSize }) {
  try {
    const AllDeactivatedNewConvert = await api.get(
      `${baseUrl}${appUrls.GET_ALL_DEACTIVATED_NEWCONVERTS}?page=${pageNumber}&pageSize=${pageSize}`
    );
    const fetchDeactivatedNewConvert = await AllDeactivatedNewConvert?.data
      ?.Data;
    return await fetchDeactivatedNewConvert;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function approveAWorker(workerId) {
  try {
    const approveAWorker = await api.post(
      `${baseUrl}${appUrls.APPROVE_A_WORKER}/${workerId}`
    );
    const postAWorker = await approveAWorker?.data;
    return postAWorker;
  } catch (error) {
    toast.error(error.message);
    throw new Error(error.message || error);
  }
}

export async function deactivateAWorker() {
  try {
    const deactivateAWorker = await api.post(
      `${baseUrl}${appUrls.SUSPEND_A_WORKER}`
    );
    const postDeactivated = await deactivateAWorker?.data;
    return await postDeactivated;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function deleteAWorker(id) {
  try {
    const deleteAWorker = await api.post(
      `${baseUrl}${appUrls.DELETE_A_WORKER}?workerId=${id}`,
      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        cache: false,
      }
    );
    const postDeleteAWorker = await deleteAWorker?.data;
    return await postDeleteAWorker;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function reactivateWorker() {
  try {
    const ReactivateWorker = await api.post(
      `${baseUrl}${appUrls.REACTIVATE_A_WORKER}`
    );
    const postReactivateWorker = await ReactivateWorker?.data;
    return await postReactivateWorker;
  } catch (error) {
    throw new Error(error.message || error);
  }
}
