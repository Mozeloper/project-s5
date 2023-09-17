export const appUrls = {
  //Authentication
  LOGIN_URL: '/api/v1/Authentication/login',
  REGISTER: '/api/v1/Authentication/register',
  REFRESHTOKEN_URL: '/api/v1/Authentication/refresh-token',
  FORGETPASSWORD_URL: '/api/v1/Authentication/forget-password',
  RESETPASSWORD_URL: '/api/v1/Authentication/reset-password',

  //Department
  GETCHURCHDEPT: '/api/Entity/get-church-department',

  //Super Admins
  GETALLWORKERS: '/api/SuperAdmin/get-all-workers', // 
  GET_ALL_SUPERADMINS: '/api/SuperAdmin/get-all-admin',
  GET_ALL_New_Converts_URL: '/api/SuperAdmin/get-all-new-converts',
  GET_WORKER_DETAILS: '/api/SuperAdmin/get-worker', //get worker by id

  //Worker
  GETSINGLEWORKERDETAILS_URL: '/api/Worker/get-worker-profile', //worker

  //New converts (soul)
  GET_ALL_New_Convert:
    'api/NewConvertAdmin/get-all-new-convants-for-newconvertadmin',

  //Ministry
  GET_ALL_MINISTRY_URL:
    '/api/MinistryAdmin/get-all-new-convert-for-ministry-admin',

  //DTI Admins
  GET_ALL_DTIAdmin_URL: '/api/DTIAdmin/get-new-convant-for-dtiadmin',

  //Analytics Count
  GET_ALL_SOULS_COUNT_URL: '/api/SuperAdmin/get-all-newconvert-count',
  GET_ALL_WORKERS_COUNT_URL: '/api/SuperAdmin/get-all-worker-count',
  ADMINS_DASHBOARD_ANALYTICS: '/api/Analytics/Admin-dashboard/retrieve-newconverts-analytics',
  NEWCONVERT_DASHBOARD_ANALYTICS: '/api/Analytics/newconvertAdmin-dashboard/retrieve-newconverts-analytics',
  DTI_ADMINS_DASHBOARD_ANALYTICS: '/api/Analytics/dtiadmin-dashboard/retrieve-newconverts-analytics',
  MINISTRY_ADMINS_DASHBOARD_ANALYTICS: '/api/Analytics/mininstryadmin-dashboard/retrieve-newconverts-analytics',
  PERSONAL_ANALYTICS_BY_ID: '/api/Analytics/worker-dashboard/retrieve-newconverts-analytics',
  //Approvals
  GET_ALL_UNAPPROVED_WORKERS: '/api/SuperAdmin/get-all-unapproved-workers',
  GET_ALL_DEACTIVATED_WORKERS: '/api/SuperAdmin/get-all-deactivated-workers',
  APPROVE_A_WORKER: '/api/SuperAdmin/approve-new-worker', //This api takes in an {id}
  SUSPEND_A_WORKER: 'api/SuperAdmin/deactivate-worker-account', //This api takes in an {id}
  DELETE_A_WORKER: '/api/SuperAdmin/delete-worker-account', //This api takes in an {id}
  REACTIVATE_A_WORKER: '/api/SuperAdmin/reactivate-worker-account', //This api takes in an {id}

  // Profile
  CHANGEPASSWORD_URL: '/api/v1/Authentication/change-password',
  UPDATEUSER_URL: '/api/Worker/update-worker-profile',
};
