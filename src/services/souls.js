import { api } from "./api";
import { appUrls } from "./urls";
const baseUrl = import.meta.env.VITE_BASE_URL

const token = sessionStorage.getItem('token');

export async function getAllNewConvert({ pageNumber, pageSize, searchquery }) {
    try {
        const NewConvert = await api.get(`${baseUrl}${appUrls.GET_ALL_New_Converts_URL}?page=${pageNumber}&pageSize=${pageSize}&searchquery=${searchquery}`)
        const NewConvertRes = await NewConvert?.data?.Data
        return NewConvertRes
    } catch (error) {
        throw new Error(error.message || error)
    }
}


export async function getSoulsUnderByWorkerId({ workerId, pageNumber, pageSize }) {
  try {
    const NewConvert = await api.get(
      `${baseUrl}${appUrls.GET_ALL_SOULS_UNDER_A_WORKER}/${workerId}?page=${pageNumber}&pageSize=${pageSize}&searchquery=${searchquery}`
    );
    const NewConvertRes = await NewConvert?.data?.Data;
    return NewConvertRes;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getSoulsUnderMe({ pageNumber, pageSize, searchquery }) {
  try {
    const MyConverts = await api.get(
      `${baseUrl}${appUrls.GET_SOULS_UNDER_ME}?page=${pageNumber}&pageSize=${pageSize}&searchquery=${searchquery}`
    );
    const MyConvertRes = await MyConverts?.data?.Data;
    return MyConvertRes;
  } catch (error) {
    throw new Error(error.message || error);
  }
}