import axios from "axios";
import { appUrls } from "./urls";
import { axiosRequest } from "../utils/axios-utils";
import { api } from "./api";
import toast from "react-hot-toast"
const baseUrl = import.meta.env.VITE_BASE_URL

export async function getAllUnApproval({ pageNumber, pageSize }) {
    try {
        // const UnApproval = await axios.get(`${baseUrl}${appUrls.GET_ALL_UNAPPROVED_WORKERS}`, {
        //     headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}, cache: 'force-cache',
        // })
        // const fetchUnApproval =  await UnApproval?.data
        // return await fetchUnApproval
        const fetchUnApproval = await axiosRequest({ url : `${appUrls?.GET_ALL_UNAPPROVED_WORKERS}?page=${pageNumber}&pageSize=${pageSize}`})
        return fetchUnApproval?.data
    } catch (error) {
        throw new Error(error.message || error)
    }
}


export async function getAllDeactivatedWorker({ pageNumber, pageSize }) {
    try {
        const AllDeactivatedWorker =  await axiosRequest({ url : `${appUrls.GET_ALL_DEACTIVATED_WORKERS}?page=${pageNumber}&pageSize=${pageSize}`})
        return await AllDeactivatedWorker?.data?.Data
    } catch (error) {
        throw new Error(error.message || error)
    }
}

export async function getAllDeactivatedNewConvert({ pageNumber, pageSize }) {
    try {
        // const AllDeactivatedWorker =  await axiosRequest({ url : `${appUrls.GET_ALL_DEACTIVATED_NEWCONVERTS}?page=${pageNumber}&pageSize=${pageSize}`})
        // return await AllDeactivatedWorker?.data

        const AllDeactivatedNewConvert = await api.get(`${baseUrl}${appUrls.GET_ALL_DEACTIVATED_NEWCONVERTS}?page=${pageNumber}&pageSize=${pageSize}`)
        const fetchDeactivatedNewConvert =  await AllDeactivatedNewConvert?.data?.Data
        return await fetchDeactivatedNewConvert
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
        toast.error(error.message)
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