import axios from "axios";
import { appUrls } from "./urls";
import { axiosRequest } from "../utils/axios-utils";
const baseUrl = import.meta.env.VITE_BASE_URL

const token = sessionStorage.getItem('token');
export async function getAllUnApproval() {
    try {
        // const UnApproval = await axios.get(`${baseUrl}${appUrls.GET_ALL_UNAPPROVED_WORKERS}`, {
        //     headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}, cache: 'force-cache',
        // })
        // const fetchUnApproval =  await UnApproval?.data
        // return await fetchUnApproval
        const fetchUnApproval = await axiosRequest({ url : `${appUrls?.GET_ALL_UNAPPROVED_WORKERS}`})
        return fetchUnApproval?.data
    } catch (error) {
        throw new Error(error.message || error)
    }
}


export async function getAllDeactivatedWorker() {
    try {
        const AllDeactivatedWorker =  await axiosRequest({ url : `${appUrls.GET_ALL_DEACTIVATED_WORKERS}`})
        return await AllDeactivatedWorker?.data
    } catch (error) {
        throw new Error(error.message || error)
    }
}


export async function approveAWorker(workerId) {
    try {
        console.log('workerId axios 1', await workerId);
        const approveAWorker = await axios.post(`${baseUrl}${appUrls.APPROVE_A_WORKER}/${workerId}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}
        })
        console.log('workerId axios 2', workerId);

        const postAWorker =  await approveAWorker?.data

        console.log('workerId axios 3', workerId);
        return postAWorker
    } catch (error) {
        throw new Error(error.message || error)
    }
}


export async function deactivateAWorker() {
    try {
        const deactivateAWorker = await axios.post(`${baseUrl}${appUrls.SUSPEND_A_WORKER}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}, cache: 'force-cache',
        })
        const postDeactivated =  await deactivateAWorker?.data
        return await postDeactivated
    } catch (error) {
        throw new Error(error.message || error)
    }
}

export async function deleteAWorker(id) {
    try {
        const deleteAWorker = await axios.post(`${baseUrl}${appUrls.DELETE_A_WORKER}?workerId=${id}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}, cache: false,
        })
        const postDeleteAWorker =  await deleteAWorker?.data
        return await postDeleteAWorker
    } catch (error) {
        throw new Error(error.message || error)
    }
}




export async function reactivateWorker() {
    try {
        const ReactivateWorker = await axios.post(`${baseUrl}${appUrls.REACTIVATE_A_WORKER}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}, cache: 'force-cache',
        })
        const postReactivateWorker =  await ReactivateWorker?.data
        return await postReactivateWorker
    } catch (error) {
        throw new Error(error.message || error)
    }
}