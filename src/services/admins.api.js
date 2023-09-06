import axios from "axios";
import { appUrls } from "./urls";
const baseUrl = import.meta.env.VITE_BASE_URL

const token = sessionStorage.getItem('token');
export async function getAllAdmins() {
    try {
        const admins = await fetch(`${baseUrl}${appUrls.GETALLWORKERS_URL}`, {
            headers: {Authorization: `Bearer ${token}`},
        })
        const fetchAdmins =  await admins.json().then(data => data)
        const res = await fetchAdmins
        
        return res
    } catch (error) {
        throw new Error(error.message || error)
    }
}
