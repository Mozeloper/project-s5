import { api } from "./api";
import { appUrls } from "./urls";
const baseUrl = import.meta.env.VITE_BASE_URL

const token = sessionStorage.getItem('token');

export async function getAllNewConvert({ pageNumber, pageSize }) {
    try {
        const NewConvert = await api.get(`${baseUrl}${appUrls.GET_ALL_New_Converts_URL}?page=${pageNumber}&pageSize=${pageSize}`)
        const NewConvertRes = await NewConvert?.data?.Data
        return NewConvertRes
    } catch (error) {
        throw new Error(error.message || error)
    }
}

export async function getDeactivatedConvertDetails(convertId) {
    try {
        const ConvertDetails = await api.get(`${baseUrl}${appUrls.GET_DEACTIVATED_CONVERT_DETAILS}/${convertId}`)
        const ConvertDetailsRes = await ConvertDetails?.data?.Data;
        return ConvertDetailsRes
    } catch (error) {
        throw new Error(error.message || error)
    }
}


export async function getSoulsUnderByWorkerId({ workerId, pageNumber, pageSize }) {
  try {
    const NewConvert = await api.get(
      `${baseUrl}${appUrls.GET_ALL_SOULS_UNDER_A_WORKER}/${workerId}?page=${pageNumber}&pageSize=${pageSize}`
    );
    const NewConvertRes = await NewConvert?.data?.Data;
    return NewConvertRes;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getSoulsUnderMe({ pageNumber, pageSize }) {
  try {
    const MyConverts = await api.get(
      `${baseUrl}${appUrls.GET_SOULS_UNDER_ME}?page=${pageNumber}&pageSize=${pageSize}`
    );
    const MyConvertRes = await MyConverts?.data?.Data;
    return MyConvertRes;
  } catch (error) {
    throw new Error(error.message || error);
  }
}



export async function deleteAConvert(convertId) {
  try {
    const deleteAConvert = await api.post(
      `${baseUrl}${appUrls.DELETE_A_CONVERT}/${convertId}`,
      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        cache: false,
      }
    );
    const deletedConvertRes = await deleteAConvert?.data;
    return await deletedConvertRes;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function reactivateAConvert(convertId, reason) {
  const payload = {
    id: `${convertId}`,
    reasonForDeactivation: `${reason}`,
  };
  try {
    const ReactivatedConvert = await api.post(
      `${baseUrl}${appUrls.REACTIVATE_A_CONVERT}`,
      payload
    );
    const reactivatedConvertRes = await ReactivatedConvert?.data;
    return await reactivatedConvertRes;
  } catch (error) {
    throw new Error(error.message || error);
  }
}