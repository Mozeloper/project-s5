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
