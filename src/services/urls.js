export const appUrls = {
  //Authentication
  LOGIN_URL: '/Authentication/login',
  REGISTER: '/Authentication/register',
  REFRESHTOKEN_URL: '/Authentication/refresh-token',
  FORGETPASSWORD_URL: '/Authentication/forget-password',
  RESETPASSWORD_URL: '/Authentication/reset-password',

  //Department
  GETCHURCHDEPT: '/Entity/get-church-department',

  //Super Admins
  GETALLWORKERS: '/SuperAdmin/get-all-workers', //
  GET_ALL_SUPERADMINS: '/SuperAdmin/get-all-admin',
  GET_ADMIN_DETAILS: '/SuperAdmin/get-admin-by', //get worker by id
  GET_ALL_New_Converts_URL: '/SuperAdmin/get-all-new-converts',
  GET_WORKER_DETAILS: '/SuperAdmin/get-worker', //get worker by id
  ADD_ROLE_TO_USER: '/SuperAdmin/Add-user-role', //accepts id & role as query  eg ?userId=1&roles=User
  REMOVE_ADMIN_FROM_ROLE: '/SuperAdmin/Remove-user-role', //remove a role from an admin, accepts the admin's id and the role as a query param eg /ADMIN_ID?roles=User

  //Worker
  GETSINGLEWORKERDETAILS_URL: '/Worker/get-worker-profile', //user's pofile

  //New converts (soul)
  GET_ALL_New_Convert:
    '/NewConvertAdmin/get-all-new-convants-for-newconvertadmin',
  GET_CONVERT_DETAILS: '/NewConvert/get-new-converts', //get soul by id
  GET_ALL_SOULS_UNDER_A_WORKER: '/NewConvert/get-new-converts-by-worker', //accepts worker's id
  DELETE_A_CONVERT: '/NewConvert/delete-new-convert', //delete soul by id
  SUSPEND_A_CONVERT: '/NewConvert/deactivate-new-convert', //suspend soul by id
  REACTIVATE_A_CONVERT: '/NewConvert/reactivate-new-convert', //reactivate soul by id

  //Ministry
  GET_ALL_MINISTRY_URL:
    '/MinistryAdmin/get-all-new-convert-for-ministry-admin',

  //DTI Admins
  GET_ALL_DTIAdmin_URL: '/DTIAdmin/get-new-convant-for-dtiadmin',

  //Analytics Count
  GET_ALL_SOULS_COUNT_URL: '/SuperAdmin/get-all-newconvert-count',
  GET_ALL_WORKERS_COUNT_URL: '/SuperAdmin/get-all-worker-count',
  ADMINS_DASHBOARD_ANALYTICS:
    '/Analytics/Admin-dashboard/retrieve-newconverts-analytics',
  NEWCONVERT_DASHBOARD_ANALYTICS:
    '/Analytics/newconvertAdmin-dashboard/retrieve-newconverts-analytics',
  DTI_ADMINS_DASHBOARD_ANALYTICS:
    '/Analytics/dtiadmin-dashboard/retrieve-newconverts-analytics',
  MINISTRY_ADMINS_DASHBOARD_ANALYTICS:
    '/Analytics/mininstryadmin-dashboard/retrieve-newconverts-analytics',
  PERSONAL_ANALYTICS_BY_ID:
    '/Analytics/worker-dashboard/retrieve-newconverts-analytics',
    
  //Approvals
  GET_ALL_UNAPPROVED_WORKERS: '/Approval/get-all-unapproved-workers',
  GET_UNAPPROVED_WORKERDETAILS: '/Approval/get-unapproved-worker', //This api takes in an {workerId}
  GET_ALL_DEACTIVATED_WORKERS: '/SuperAdmin/get-all-deactivated-workers',
  APPROVE_A_WORKER: '/SuperAdmin/approve-new-worker', //This api takes in an {id}
  SUSPEND_A_WORKER: 'api/SuperAdmin/deactivate-worker-account', //This api takes in an {id}
  DELETE_A_WORKER: '/SuperAdmin/delete-worker-account', //This api takes in an {id}
  REACTIVATE_A_WORKER: '/SuperAdmin/reactivate-worker-account', //This api takes in an {id}

  // Profile
  CHANGEPASSWORD_URL: '/v1/Authentication/change-password',
  UPDATEUSER_URL: '/Worker/update-worker-profile',
};
