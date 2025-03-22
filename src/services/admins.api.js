import axios from "axios";
import { appUrls } from "./urls";
import { api } from "./api";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_BASE_URL;

export async function getAllAdmins({ pageNumber, pageSize, searchquery }) {
  try {
    const admins = await api.get(
      `${baseUrl}${appUrls.GET_ALL_SUPERADMINS}?page=${pageNumber}&pageSize=${pageSize}&searchquery=${searchquery}`
    );
    const fetchAdmins = await admins?.data?.Data;
    return await fetchAdmins;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

//This endpoint is not really important. but don't delete it.
//just to fetch the entire name in the db without page number or any parameters
//It's the replica of the function above with out parameters/queries
export async function getAllSearchAdmins() {
  try {
    const admins = await api.get(`${baseUrl}${appUrls.GET_ALL_SUPERADMINS}`);
    const fetchAdmins = await admins?.data?.Data;
    return await fetchAdmins;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAllMinistryAdmins({
  pageNumber,
  pageSize,
  searchquery,
}) {
  try {
    const Ministryadmins = await api.get(
      `${baseUrl}${appUrls.GET_ALL_MINISTRY_URL}?page=${pageNumber}&pageSize=${pageSize}&searchquery=${searchquery}`
    );
    const fetchMinistryAdmins = await Ministryadmins?.data?.Data;
    return await fetchMinistryAdmins;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAllConvertsInDti({
  pageNumber,
  pageSize,
  searchquery,
}) {
  try {
    const dtiConverts = await api.get(
      `${baseUrl}${appUrls.GET_ALL_DTIAdmin_URL}?page=${pageNumber}&pageSize=${pageSize}&searchquery=${searchquery}`
    );
    const fetchDtiConverts = await dtiConverts?.data?.Data;
    return await fetchDtiConverts;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAllConvertsInNewBelievers({
  pageNumber,
  pageSize,
  searchquery,
}) {
  try {
    const newbeleiversConverts = await api.get(
      `${baseUrl}${appUrls.GET_ALL_NEW_BELIEVERS_CONVERTS}?page=${pageNumber}&pageSize=${pageSize}&searchquery=${searchquery}`
    );
    const fetchNewBelieversConverts = await newbeleiversConverts?.data?.Data;
    return await fetchNewBelieversConverts;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function suspendAConvert(convertId, reason) {
  const ConvertId = Number(convertId);
  const payload = {
    id: `${ConvertId}`,
    reasonForDeactivation: `${reason}`,
  };
  try {
    const suspendedConvert = await api.post(
      `${baseUrl}${appUrls.SUSPEND_A_CONVERT}`,
      payload
    );
    const SuspendedConvertRes = await suspendedConvert?.data;
    return SuspendedConvertRes;
  } catch (error) {
    toast.error(error || error.message);
    throw new Error(error.message || error);
  }
}
export async function promoteConvertToMinistry(convertId, departmentId) {
  const payload = {
    id: `${convertId}`,
    status: "NewBeliever",
    departmentId: `${departmentId}`,
  };
  try {
    const promotedConvert = await api.post(
      `${baseUrl}${appUrls.PROMOTE_CONVERT_TO_MINISTRY}`,
      payload
    );
    const PromotedConvertRes = await promotedConvert?.data?.Data;
    return PromotedConvertRes;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAllWorkersAdmins({
  pageNumber,
  pageSize,
  searchquery,
}) {
  try {
    const Workersadmins = await api.get(
      `${baseUrl}${appUrls.GETALLWORKERS}?page=${pageNumber}&pageSize=${pageSize}&searchquery=${searchquery}`
    );
    const fetchWorkersAdmins = await Workersadmins?.data?.Data;
    return await fetchWorkersAdmins;
  } catch (error) {
    toast.error(error || error.message);
    throw new Error(error.message || error);
  }
}

export async function getAllWorkersNames() {
  try {
    const Workersadmins = await api.get(`${baseUrl}${appUrls.GETALLWORKERS}`);
    const fetchWorkersAdmins = await Workersadmins?.data?.Data;
    return await fetchWorkersAdmins;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAllDTIAdminNames(nameQuery) {
  try {
    const DtiAdminNames = await api.get(
      `${baseUrl}${appUrls.GET_ALL_NEW_BELIEVERS_ADMIN_NAMES}?searchquery=${nameQuery}`
    );
    const fetchDTIAdmins = await DtiAdminNames?.data?.Data;
    return await fetchDTIAdmins;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function assignConvertToAdmin(convertId, adminId) {
  try {
    const assignConvert = await api.post(
      `${baseUrl}${appUrls.ASSIGN_NEW_BELIEVERS_ADMIN_TO_CONVERT}?convertId=${convertId}&disciplerId=${adminId}`
    );
    const AssignedConvertRes = await assignConvert?.data;
    return AssignedConvertRes;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      const responseJson = JSON.parse(error.request.responseText);
      if (responseJson.Message) {
        toast.error(responseJson.Message, 5000);
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.response.status);
    }
    //console.log(error.config);
    throw new Error(error.message || error);
  }
}

export async function getUnApprovalCount() {
  try {
    const fetchUnApprovalCount = await api.get(
      `${appUrls?.GET_ALL_UNAPPROVED_WORKERS}`
    );
    const fetchUnApprovalCountRes = await fetchUnApprovalCount?.data.Data;
    return fetchUnApprovalCountRes;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function exportAllNewConverts() {
  try {
    // startDate and endDate
    const exportedConverts = await api.get(
      `${appUrls?.EXPORT_ALL_CONVERTS}`,
      { responseType: "blob" } // Specify the response type as blob
    );
    const exportedConvertsRes = await exportedConverts;
    // console.log(exportedConvertsRes);
    // Create a Blob object from the response data
    const blob = new Blob([exportedConvertsRes.data]);

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");

    // Set the href attribute to the URL of the Blob
    link.href = url;

    // Set the download attribute to specify the filename
    link.setAttribute("download", "NewConvertsData.xlsx"); // the desired filename

    // Append the link to the document body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Cleanup: remove the link and revoke the URL
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    //return exportedConvertsRes;
  } catch (error) {
    throw new Error(error.message || error);
  }
}
