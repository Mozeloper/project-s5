import axios from "axios";
import { appUrls } from "./urls";
const baseUrl = import.meta.env.VITE_BASE_URL

const token = sessionStorage.getItem('token');

// const token = setTimeout(function() {
//     return sessionStorage.getItem('token');
// }, 50);

export async function getAllAdmins({ pageNumber }) {
    try {
        const admins = await axios.get(`${baseUrl}${appUrls.GETALLWORKERS_URL}?page=${pageNumber}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}, cache: 'force-cache',
        })
        const fetchAdmins =  await admins?.data
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
        const fetchMinistryAdmins =  await Ministryadmins?.data
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
//         const fetchWorkersAdmins =  await Workersadmins?.data
//         return await fetchWorkersAdmins
//     } catch (error) {
//         throw new Error(error.message || error)
//     }
// }


export async function getAllWorkersAdmins({ pageNumber }) {
    try {
        const Workersadmins = await axios.get(`${baseUrl}${appUrls.GETSINGLEWORKERDETAILS_URL}?page=${pageNumber}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}, cache: 'force-cache',
        })
        const fetchWorkersAdmins =  await Workersadmins?.data
        return await fetchWorkersAdmins
    } catch (error) {
        throw new Error(error.message || error)
    }
}