import { api } from './api';
import { appUrls } from './urls';

const baseUrl = import.meta.env.VITE_BASE_URL;

//Old Analytics Api fetcher functions
export async function getAllSoulsCount() {
  try {
    const soulsCount = await api.get(
      `${baseUrl}${appUrls.GET_ALL_SOULS_COUNT_URL}`
    );
    const soulsRes = await soulsCount?.data;
    return soulsRes;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAllWorkersCount() {
  try {
    const allWorkersCount = await api.get(
      `${baseUrl}${appUrls.GET_ALL_WORKERS_COUNT_URL}`
    );
    const WorkersCount = await allWorkersCount?.data;
    return WorkersCount;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

//Active Analytics Api fetcher functions
export async function getAllAdminDashboardAnalytics() {
  try {
    const allAdminDashboardAnalytics = await api.get(
      `${baseUrl}${appUrls.ADMINS_DASHBOARD_ANALYTICS}`
    );
    const AdminDashboardAnalytics = await allAdminDashboardAnalytics?.data;
    return AdminDashboardAnalytics;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAllNewConvertDashboardAnalytics() {
  try {
    const allNewConvertDashboardAnalytics = await api.get(
      `${baseUrl}${appUrls.NEWCONVERT_DASHBOARD_ANALYTICS}`
    );
    const NewConvertDashboardAnalytics =
      await allNewConvertDashboardAnalytics?.data;
    return NewConvertDashboardAnalytics;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAllDtiDashboardAnalytics() {
  try {
    const allDtiDashboardAnalytics = await api.get(
      `${baseUrl}${appUrls.DTI_ADMINS_DASHBOARD_ANALYTICS}`
    );
    const DtiDashboardAnalytics = await allDtiDashboardAnalytics?.data;
    return DtiDashboardAnalytics;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getAllMinistryDashboardAnalytics() {
  try {
    const allMinistryDashboardAnalytics = await api.get(
      `${baseUrl}${appUrls.MINISTRY_ADMINS_DASHBOARD_ANALYTICS}`
    );
    const MinistryDashboardAnalytics =
      await allMinistryDashboardAnalytics?.data;
    return MinistryDashboardAnalytics;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getPersonalAnalytics(AnalyticsId) {
  try {
    const allMinistryDashboardAnalytics = await api.get(
      `${baseUrl}${appUrls.PERSONAL_ANALYTICS_BY_ID}/${AnalyticsId}`
    );
    const MinistryDashboardAnalytics =
      await allMinistryDashboardAnalytics?.data;
    return MinistryDashboardAnalytics;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function getTopPerformers() {
  try {
    const topPerformers = await api.get(
      `${baseUrl}${appUrls.GET_TOP_PERFORMERS}`
    );
    const topPerformersRes = await topPerformers?.data;
    return topPerformersRes;
  } catch (error) {
    throw new Error(error.message || error);
  }
}
