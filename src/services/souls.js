import { api } from "./api";
import { appUrls } from "./urls";
const baseUrl = import.meta.env.VITE_BASE_URL

const token = sessionStorage.getItem('token');

export async function getAllNewConvert({ pageNumber, pageSize }) {
    try {
        const NewConvert = await api.get(`${baseUrl}${appUrls.GET_ALL_New_Converts_URL}?page=${pageNumber}&pageSize=${pageSize}`)
        const NewConvertRes = await NewConvert?.data?.data
        return NewConvertRes
    } catch (error) {
        throw new Error(error.message || error)
    }
}