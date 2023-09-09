import axios from "axios";
import { appUrls } from "./urls";
const baseUrl = import.meta.env.VITE_BASE_URL

const token = sessionStorage.getItem('token');
export async function getAllAdmins() {
    try {
        const admins = await fetch(`${baseUrl}${appUrls.GETALLWORKERS_URL}`, {
            headers: {Authorization: `Bearer ${token}`}, cache: 'force-cache',
        })
        const fetchAdmins =  await admins.json().then(data => data)
        const res = await fetchAdmins
        
        return res
    } catch (error) {
        throw new Error(error.message || error)
    }
}

export async function getAllMinistryAdmins() {
    try {
        const Ministryadmins = await fetch(`${baseUrl}${appUrls.GET_ALL_MINISTRY_URL}`, {
            headers: {Authorization: `Bearer ${token}`}, cache: 'force-cache',
        })
        const fetchMinistryAdmins =  await Ministryadmins.json().then(data => data)
        const res = await fetchMinistryAdmins
        
        return res
    } catch (error) {
        throw new Error(error.message || error)
    }
}

export async function getAllDtiAdmins() {
    try {
        const Dtiadmins = await fetch(`${baseUrl}${appUrls.GET_ALL_DTIAdmin_URL}`, {
            headers: {Authorization: `Bearer ${token}`}, cache: 'force-cache',
        })
        const fetchDtiAdmins =  await Dtiadmins.json().then(data => data)
        const res = await fetchDtiAdmins
        
        return res
    } catch (error) {
        throw new Error(error.message || error)
    }
}
