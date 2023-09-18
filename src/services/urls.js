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
  GET_ADMIN_DETAILS: '/api/SuperAdmin/get-admin-by', //get worker by id
  GET_ALL_New_Converts_URL: '/api/SuperAdmin/get-all-new-converts',
  GET_WORKER_DETAILS: '/api/SuperAdmin/get-worker', //get worker by id
  ADD_ROLE_TO_USER: '/api/SuperAdmin/Add-user-role', //accepts id & role as query  eg ?userId=1&roles=User
  REMOVE_ADMIN_FROM_ROLE: '/api/SuperAdmin/Remove-user-role', //remove a role from an admin, accepts the admin's id and the role as a query param eg /ADMIN_ID?roles=User

  //Worker
  GETSINGLEWORKERDETAILS_URL: '/api/Worker/get-worker-profile', //user's pofile

  //New converts (soul)
  GET_ALL_New_Convert:
    '/api/NewConvertAdmin/get-all-new-convants-for-newconvertadmin',
  GET_CONVERT_DETAILS: '/api/NewConvert/get-new-converts', //get soul by id
  GET_ALL_SOULS_UNDER_A_WORKER: '/api/NewConvert/get-new-converts-by-worker', //accepts worker's id
  DELETE_A_CONVERT: '/api/NewConvert/delete-new-convert', //delete soul by id
  SUSPEND_A_CONVERT: '/api/NewConvert/deactivate-new-convert', //suspend soul by id
  REACTIVATE_A_CONVERT: '/api/NewConvert/reactivate-new-convert', //reactivate soul by id

  //Ministry
  GET_ALL_MINISTRY_URL:
    '/api/MinistryAdmin/get-all-new-convert-for-ministry-admin',

  //DTI Admins
  GET_ALL_DTIAdmin_URL: '/api/DTIAdmin/get-new-convant-for-dtiadmin',

  //Analytics Count
  GET_ALL_SOULS_COUNT_URL: '/api/SuperAdmin/get-all-newconvert-count',
  GET_ALL_WORKERS_COUNT_URL: '/api/SuperAdmin/get-all-worker-count',
  ADMINS_DASHBOARD_ANALYTICS:
    '/api/Analytics/Admin-dashboard/retrieve-newconverts-analytics',
  NEWCONVERT_DASHBOARD_ANALYTICS:
    '/api/Analytics/newconvertAdmin-dashboard/retrieve-newconverts-analytics',
  DTI_ADMINS_DASHBOARD_ANALYTICS:
    '/api/Analytics/dtiadmin-dashboard/retrieve-newconverts-analytics',
  MINISTRY_ADMINS_DASHBOARD_ANALYTICS:
    '/api/Analytics/mininstryadmin-dashboard/retrieve-newconverts-analytics',
  PERSONAL_ANALYTICS_BY_ID:
    '/api/Analytics/worker-dashboard/retrieve-newconverts-analytics',
  //Approvals
  GET_ALL_UNAPPROVED_WORKERS: '/api/Approval/get-all-unapproved-workers',
  GET_UNAPPROVED_WORKERDETAILS: '/api/Approval/get-unapproved-worker', //This api takes in an {workerId}
  GET_ALL_DEACTIVATED_WORKERS: '/api/SuperAdmin/get-all-deactivated-workers',
  APPROVE_A_WORKER: '/api/SuperAdmin/approve-new-worker', //This api takes in an {id}
  SUSPEND_A_WORKER: 'api/SuperAdmin/deactivate-worker-account', //This api takes in an {id}
  DELETE_A_WORKER: '/api/SuperAdmin/delete-worker-account', //This api takes in an {id}
  REACTIVATE_A_WORKER: '/api/SuperAdmin/reactivate-worker-account', //This api takes in an {id}

  // Profile
  CHANGEPASSWORD_URL: '/api/v1/Authentication/change-password',
  UPDATEUSER_URL: '/api/Worker/update-worker-profile',
};
