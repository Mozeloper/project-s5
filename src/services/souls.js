import axios from "axios";
import { appUrls } from "./urls";
const baseUrl = import.meta.env.VITE_BASE_URL

const token = sessionStorage.getItem('token');
export async function getAllSoulsCount() {
    try {
        const souls = await fetch(`${baseUrl}${appUrls.GET_ALL_SOULS_COUNT_URL}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`},
        })
        const soulsCount =  await souls.json().then(data => data)
        const res = await soulsCount
        return res
    } catch (error) {
        throw new Error(error.message || error)
    }
}

export async function getAllWorkersCount() {
    try {
        const souls = await fetch(`${baseUrl}${appUrls.GET_ALL_WORKERS_COUNT_URL}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`},
        })
        const soulsCount =  await souls.json().then(data => data)
        const res = await soulsCount
        return res
    } catch (error) {
        throw new Error(error.message || error)
    }
}


export async function getAllNewConvert() {
    try {
        const NewConvert = await fetch(`${baseUrl}${appUrls.GET_ALL_New_Converts_URL}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`},
        })
        const fetchNewConvert =  await NewConvert.json().then(data => data)
        const res = await fetchNewConvert?.data?.data

        return res

    } catch (error) {
        throw new Error(error.message || error)
    }
}