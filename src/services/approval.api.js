import axios from "axios";
import { appUrls } from "./urls";
const baseUrl = import.meta.env.VITE_BASE_URL

const token = sessionStorage.getItem('token');
export async function getAllUnApproval() {
    try {
        const UnApproval = await fetch(`${baseUrl}${appUrls.GET_ALL_UNAPPROVED_WORKERS}`, {
            headers: {Authorization: `Bearer ${token}`}, cache: 'force-cache',
        })
        const fetchUnApproval =  await UnApproval.json().then(data => data)
        const res = await fetchUnApproval?.Data
        
        return res
    } catch (error) {
        throw new Error(error.message || error)
    }
}


export async function getAllDeactivatedWorker() {
    try {
        const Deactivated = await fetch(`${baseUrl}${appUrls.GET_ALL_DEACTIVATED_WORKERS}`, {
            headers: {Authorization: `Bearer ${token}`}, cache: 'force-cache',
        })
        const fetchDeactivated =  await Deactivated.json().then(data => data)
        const res = await fetchDeactivated

        return res
    } catch (error) {
        throw new Error(error.message || error)
    }
}


export async function approveAWorker(id) {
    try {
        const Deactivated = await fetch(`${baseUrl}${appUrls.APPROVE_A_WORKER}/${id}`, {
            method: 'POST',
            headers: {Authorization: `Bearer ${token}`}, cache: 'force-cache',
        })
        const fetchDeactivated =  await Deactivated.json().then(data => data)
        const res = await fetchDeactivated
        return res
    } catch (error) {
        throw new Error(error.message || error)
    }
}


export async function deactivateAWorker() {
    try {
        const Deactivated = await fetch(`${baseUrl}${appUrls.SUSPEND_A_WORKER}`, {
            headers: {Authorization: `Bearer ${token}`}, cache: 'force-cache',
        })
        const fetchDeactivated =  await Deactivated.json().then(data => data)
        const res = await fetchDeactivated

        return res
    } catch (error) {
        throw new Error(error.message || error)
    }
}

export async function deleteAWorker() {
    try {
        const Deactivated = await fetch(`${baseUrl}${appUrls.DELETE_A_WORKER}`, {
            headers: {Authorization: `Bearer ${token}`}, cache: 'force-cache',
        })
        const fetchDeactivated =  await Deactivated.json().then(data => data)
        const res = await fetchDeactivated

        return res
    } catch (error) {
        throw new Error(error.message || error)
    }
}


export async function reactivateWorker() {
    try {
        const Deactivated = await fetch(`${baseUrl}${appUrls.REACTIVATE_A_WORKER}`, {
            headers: {Authorization: `Bearer ${token}`}, cache: 'force-cache',
        })
        const fetchDeactivated =  await Deactivated.json().then(data => data)
        const res = await fetchDeactivated

        return res
    } catch (error) {
        throw new Error(error.message || error)
    }
}