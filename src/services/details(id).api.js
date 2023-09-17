import { api } from "./api"
import { appUrls } from "./urls"

export async function getAWorkerAdmin(workerId) {
    try {
        const Workersadmins = await api.get(`${appUrls.GET_WORKER_DETAILS}/${workerId}`)
        const fetchWorkersAdmins =  await Workersadmins?.data?.Data
        return await fetchWorkersAdmins
    } catch (error) {
        throw new Error(error.message || error)
    }
}

export async function getASoulAdmin(soulId) {
    try {
        const soulsadmins = await api.get(`${appUrls.GET_ALL_New_Converts_URL}/${soulId}`)
        const fetchsoulsAdmins =  await soulsadmins?.data?.Data
        return await fetchsoulsAdmins
    } catch (error) {
        throw new Error(error.message || error)
    }
}

export async function getAAdmin(adminId) {
    try {
        const admins = await api.get(`${appUrls.GET_ALL_SUPERADMINS}/${adminId}`)
        const fetchadmins =  await admins?.data?.Data
        return await fetchadmins
    } catch (error) {
        throw new Error(error.message || error)
    }
}
