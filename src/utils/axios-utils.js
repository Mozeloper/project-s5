import axios from "axios";
import toast from "react-hot-toast";

let URL = import.meta.env.VITE_BASE_URL;

const client = axios.create({ baseURL: URL })

export const axiosRequest = ({ ...options }) => {
    client.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem("token")}`
    const onSuccess = (respond) => respond

    const onError = (error) => {
        if (error.statusCode == 401) {
            console.log('It seems your token, has expired');
            window.location.replace('/')
            toast.success("It seems your token, has expired", {
                icon: "🥲",
                duration: 3000,
            });
        }
        return error
    }
    return client(options).then(onSuccess).catch(onError)
}