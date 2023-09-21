import axios from 'axios';
import { appUrls } from './urls';
import { api } from './api';

const baseUrl = import.meta.env.VITE_BASE_URL;

export async function getAllAdmins({ pageNumber, pageSize }) {
  try {
    const admins = await api.get(
      `${baseUrl}${appUrls.GET_ALL_SUPERADMINS}?page=${pageNumber}&pageSize=${pageSize}`
    );
    const fetchAdmins = await admins?.data?.Data;
    return await fetchAdmins;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAllMinistryAdmins({ pageNumber, pageSize }) {
  try {
    const Ministryadmins = await api.get(
      `${baseUrl}${appUrls.GET_ALL_MINISTRY_URL}?page=${pageNumber}&pageSize=${pageSize}`
    );
    const fetchMinistryAdmins = await Ministryadmins?.data?.Data;
    return await fetchMinistryAdmins;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAllConvertsInDti() {
  try {
    const dtiConverts = await api.get(
      `${baseUrl}${appUrls.GET_ALL_DTIAdmin_URL}`
    );
    const fetchDtiConverts = await dtiConverts?.data?.data;
    return await fetchDtiConverts;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function promoteConvertToMinistry(convertId, departmentId) {
  const payload = {
    id: `${convertId}`,
    status: 'NewBeliever',
    departmentId: `${departmentId}`,
  };
  try {
    const promotedConvert = await api.post(
      `${baseUrl}${appUrls.PROMOTE_CONVERT_TO_MINISTRY}`,
      payload
    );
    const PromotedConvertRes = await promotedConvert?.data?.data;
    return PromotedConvertRes;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAllWorkersAdmins({ pageNumber, pageSize }) {
  try {
    const Workersadmins = await api.get(
      `${baseUrl}${appUrls.GETALLWORKERS}?page=${pageNumber}&pageSize=${pageSize}`
    );
    const fetchWorkersAdmins = await Workersadmins?.data?.Data;
    return await fetchWorkersAdmins;
  } catch (error) {
    throw new Error(error.message || error);
  }
}
