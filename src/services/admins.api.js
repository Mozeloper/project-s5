import axios from "axios";
import { appUrls } from "./urls";
import { api } from "./api";

const baseUrl = import.meta.env.VITE_BASE_URL

export async function getAllAdmins({ pageNumber }) {
    try {
        const admins = await api.get(`${baseUrl}${appUrls.GET_ALL_SUPERADMINS}?page=${pageNumber}`)
        const fetchAdmins =  await admins?.data?.Data
        return await fetchAdmins
    } catch (error) {
        throw new Error(error.message || error)
    }
}

export async function getAllMinistryAdmins({ pageNumber }) {
    try {
        const Ministryadmins = await api.get(`${baseUrl}${appUrls.GET_ALL_MINISTRY_URL}?page=${pageNumber}`)
        const fetchMinistryAdmins =  await Ministryadmins?.data?.Data
        return await fetchMinistryAdmins
    } catch (error) {
        throw new Error(error.message || error)
    }
}

export async function getAllWorkersAdmins({ pageNumber }) {
    try {
        const Workersadmins = await api.get(`${baseUrl}${appUrls.GETALLWORKERS}?page=${pageNumber}`)
        const fetchWorkersAdmins =  await Workersadmins?.data?.Data
        return await fetchWorkersAdmins
    } catch (error) {
        throw new Error(error.message || error)
    }
}
