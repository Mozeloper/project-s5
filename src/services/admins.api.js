import axios from "axios";
import { appUrls } from "./urls";
import { api } from "./api";
const baseUrl = import.meta.env.VITE_BASE_URL

const token = sessionStorage.getItem('token');

// const token = setTimeout(function() {
//     return sessionStorage.getItem('token');
// }, 50);

export async function getAllAdmins({ pageNumber }) {
    try {
        const admins = await axios.get(`${baseUrl}${appUrls.GETALLWORKERS}?page=${pageNumber}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}, cache: 'force-cache',
        })
        const fetchAdmins =  await admins?.data?.Data
        return await fetchAdmins
    } catch (error) {
        throw new Error(error.message || error)
    }
}

export async function getAllMinistryAdmins() {
    try {
        const Ministryadmins = await axios.get(`${baseUrl}${appUrls.GET_ALL_MINISTRY_URL}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}, cache: 'force-cache',
        })
        const fetchMinistryAdmins =  await Ministryadmins?.data?.Data
        return await fetchMinistryAdmins
    } catch (error) {
        throw new Error(error.message || error)
    }
}

// export async function getAllWorkersAdmins({ pageNumber }) {
//     try {
//         const Workersadmins = await axios.get(`${baseUrl}${appUrls.GET_ALL_WORKERSAdmin_URL}?page=${pageNumber}`, {
//             headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}, cache: 'force-cache',
//         })
//         const fetchWorkersAdmins =  await Workersadmins?.data?.Data
//         return await fetchWorkersAdmins
//     } catch (error) {
//         throw new Error(error.message || error)
//     }
// }


export async function getAllWorkersAdmins({ pageNumber }) {
    try {
        const Workersadmins = await axios.get(`${baseUrl}${appUrls.GETALLWORKERS}?page=${pageNumber}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}, cache: 'force-cache',
        })
        const fetchWorkersAdmins =  await Workersadmins?.data?.Data
        return await fetchWorkersAdmins
    } catch (error) {
        throw new Error(error.message || error)
    }
}

export async function getAWorkerAdmin(workerId) {
    try {
        const Workersadmins = await api.get(`${appUrls.GET_WORKER_DETAILS}/${workerId}?workerId=${workerId}`)
        const fetchWorkersAdmins =  await Workersadmins?.data?.Data?.Data
        return await fetchWorkersAdmins
    } catch (error) {
        throw new Error(error.message || error)
    }
}