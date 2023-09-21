export const appUrls = {
  //Authentication
  LOGIN_URL: '/api/v1/Authentication/login',
  REGISTER: '/api/v1/Authentication/register',
  REFRESHTOKEN_URL: '/api/v1/Authentication/refresh-token',
  FORGETPASSWORD_URL: '/api/v1/Authentication/forget-password',
  RESETPASSWORD_URL: '/api/v1/Authentication/reset-password',

  //Department
  GETCHURCHDEPT: '/api/v1/Entity/get-church-department',

  //Super Admins
  GETALLWORKERS: '/api/v1/SuperAdmin/get-all-workers', //
  GET_ALL_SUPERADMINS: '/api/v1/SuperAdmin/get-all-admin',
  GET_ADMIN_DETAILS: '/api/v1/SuperAdmin/get-admin-by', //get worker by id
  GET_ALL_New_Converts_URL: '/api/v1/SuperAdmin/get-all-new-converts',
  GET_WORKER_DETAILS: '/api/v1/SuperAdmin/get-worker', //get worker by id
  ADD_ROLE_TO_USER: '/api/v1/SuperAdmin/Add-user-role', //accepts id & role as query  eg ?userId=1&roles=User
  REMOVE_ADMIN_FROM_ROLE: '/api/v1/SuperAdmin/Remove-user-role', //remove a role from an admin, accepts the admin's id and the role as a query param eg /ADMIN_ID?roles=User

  //Worker
  GETSINGLEWORKERDETAILS_URL: '/api/v1/Worker/get-worker-profile', //user's pofile

  //New converts (soul)
  GET_ALL_New_Convert:
    '/api/v1/NewConvertAdmin/get-all-new-convants-for-newconvertadmin',
  GET_CONVERT_DETAILS: '/api/v1/NewConvert/get-new-converts', //get soul by id
  GET_ALL_SOULS_UNDER_A_WORKER: '/api/v1/NewConvert/get-new-converts-by-worker', //accepts worker's id
  ADD_NEW_CONVERT: 'api/v1/NewConvert/register-new-convert',
  DELETE_A_CONVERT: '/api/v1/NewConvert/delete-new-convert', //delete soul by id
  SUSPEND_A_CONVERT: '/api/v1/NewConvert/deactivate-new-convert', //suspend soul by id
  REACTIVATE_A_CONVERT: '/api/v1/NewConvert/reactivate-new-convert', //reactivate soul by id

  //Ministry
  GET_ALL_MINISTRY_URL:
    '/api/v1/MinistryAdmin/get-all-new-convert-for-ministry-admin',

  //DTI Admins
  GET_ALL_DTIAdmin_URL: '/api/v1/DTIAdmin/get-new-convant-for-dtiadmin',
  PROMOTE_CONVERT_TO_MINISTRY: '/api/v1/DTIAdmin/promote-new-convert-to-ministry',

  //Analytics Count
  GET_ALL_SOULS_COUNT_URL: '/api/v1/SuperAdmin/get-all-newconvert-count',
  GET_ALL_WORKERS_COUNT_URL: '/api/v1/SuperAdmin/get-all-worker-count',
  ADMINS_DASHBOARD_ANALYTICS:
    '/api/v1/Analytics/Admin-dashboard/retrieve-newconverts-analytics',
  NEWCONVERT_DASHBOARD_ANALYTICS:
    '/api/v1/Analytics/newconvertAdmin-dashboard/retrieve-newconverts-analytics',
  DTI_ADMINS_DASHBOARD_ANALYTICS:
    '/api/v1/Analytics/dtiadmin-dashboard/retrieve-newconverts-analytics',
  MINISTRY_ADMINS_DASHBOARD_ANALYTICS:
    '/api/v1/Analytics/mininstryadmin-dashboard/retrieve-newconverts-analytics',
  PERSONAL_ANALYTICS_BY_ID:
    '/api/v1/Analytics/worker-dashboard/retrieve-newconverts-analytics',

  //Approvals
  GET_ALL_UNAPPROVED_WORKERS: '/api/v1/Approval/get-all-unapproved-workers',
  GET_UNAPPROVED_WORKERDETAILS: '/api/v1/Approval/get-unapproved-worker', //This api takes in an {workerId}
  GET_ALL_DEACTIVATED_WORKERS: '/api/v1/SuperAdmin/get-all-deactivated-workers',
  APPROVE_A_WORKER: '/api/v1/SuperAdmin/approve-new-worker', //This api takes in an {id}
  SUSPEND_A_WORKER: 'api/v1/SuperAdmin/deactivate-worker-account', //This api takes in an {id}
  DELETE_A_WORKER: '/api/v1/SuperAdmin/delete-worker-account', //This api takes in an {id}
  REACTIVATE_A_WORKER: '/api/v1/SuperAdmin/reactivate-worker-account', //This api takes in an {id}
  GET_ALL_DEACTIVATED_NEWCONVERTS:
    '/api/v1/SuperAdmin/get-all-deactivated-newconverts',

  // Profile
  CHANGEPASSWORD_URL: '/api/v1/Authentication/change-password',
  UPDATEUSER_URL: '/api/v1/Worker/update-worker-profile',
  GET_SOULS_UNDER_ME: '/api/v1/Worker/get-new-converts-by-worker-id', //makes the user to get souls they registered
};
