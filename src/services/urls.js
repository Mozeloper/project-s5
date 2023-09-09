export const appUrls = {
  //Authentication
  LOGIN_URL: "/api/v1/Authentication/login",
  REGISTER: "/api/v1/Authentication/register",
  REFRESHTOKEN_URL: "/api/v1/Authentication/refresh-token",
  FORGETPASSWORD_URL: "/api/v1/Authentication/forget-password",
  RESETPASSWORD_URL: "/api/v1/Authentication/reset-password",

  //Department
  GETCHURCHDEPT: "/api/Entity/get-church-department",

  //Super Admins
  GETALLWORKERS_URL: "/api/SuperAdmin/get-all-workers", //super
  GET_ALL_New_Converts_URL: "/api/SuperAdmin/get-all-new-converts",

  //Worker
  GETSINGLEWORKERDETAILS_URL: "/api/Worker/get-worker", //worker

  //New converts (soul)
  GET_ALL_New_Convert:
    "api/NewConvertAdmin/get-all-new-convants-for-newconvertadmin",

  //Ministry
  GET_ALL_MINISTRY_URL:
    "/api/MinistryAdmin/get-all-new-convert-for-ministry-admin",

  //DTI Admins
  GET_ALL_DTIAdmin_URL: "/api/DTIAdmin/get-new-convant-for-dtiadmin",

  //Analytics Count
  GET_ALL_SOULS_COUNT_URL: "/api/SuperAdmin/get-all-newconvert-count",
  GET_ALL_WORKERS_COUNT_URL: "/api/SuperAdmin/get-all-worker-count",

  //Approvals
  GET_ALL_UNAPPROVED_WORKERS: "/api/SuperAdmin/get-all-unapproved-workers",
  GET_ALL_DEACTIVATED_WORKERS: "/api/SuperAdmin/get-all-deactivated-workers",

  // Profile
  CHANGEPASSWORD_URL: "/api/v1/Authentication/change-password",
};
