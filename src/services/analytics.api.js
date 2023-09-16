import { api } from "./api";
import { appUrls } from "./urls";

const baseUrl = import.meta.env.VITE_BASE_URL

export async function getAllSoulsCount() {
    try {
        const soulsCount = await api.get(`${baseUrl}${appUrls.GET_ALL_SOULS_COUNT_URL}`)
        const soulsRes = await soulsCount?.data
        return soulsRes
    } catch (error) {
        throw new Error(error.message || error)
    }
}

export async function getAllWorkersCount() {
    try {
        const allWorkersCount = await api.get(`${baseUrl}${appUrls.GET_ALL_WORKERS_COUNT_URL}`)
        const WorkersCount = await allWorkersCount?.data
        return WorkersCount
    } catch (error) {
        throw new Error(error.message || error)
    }
}