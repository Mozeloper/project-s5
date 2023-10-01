import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Signin from "./pages/auth/signin";
import DashboardLayout from "./components/Layout/dashboard";
import Authlayout from "./components/Layout/auth";
import { isObjectEmpty } from "./utils";
import Home from "./pages/dashboard/home";
import BeginRegistration from "./pages/auth/beginRegistration";
import NotFound from "./pages/notFound";
import Forbidden from './pages/forbidden';
import Register from "./pages/auth/Register";

//This is for code splitting/ Lazy loading of page for faster routing
// const Souls = React.lazy(() => import('./pages/dashboard/souls'))
const Profile = React.lazy(() => import("./pages/dashboard/profile"));
const Admins = React.lazy(() => import("./pages/dashboard/Admins"));
const AdminDetailsById = React.lazy(() => import("./pages/dashboard/Admins/[Admin-id]"));
const Workers = React.lazy(() => import("./pages/dashboard/Workers"));
const WorkerDetailsById = React.lazy(() => import("./pages/dashboard/Workers/[Worker-id]"));
const UnapprovedWorkerDetailsById = React.lazy(() => import("./pages/dashboard/UnapprovedWorkers/[Worker-id]"));
const DTI = React.lazy(() => import("./pages/dashboard/DTI"));
const NewConvert = React.lazy(() => import("./pages/dashboard/NewConvert"));
const NewConvertDetailsById = React.lazy(() => import("./pages/dashboard/NewConvert/[NewConvert-id]"));
const Souls = React.lazy(() => import("./pages/dashboard/Souls"));
const Ministry = React.lazy(() => import("./pages/dashboard/Ministry"));
const ChangePassword = React.lazy(() => import("./pages/auth/changePassword"));
const ForgetPassword = React.lazy(() => import("./pages/auth/forgetPassword"));
const Reminder = React.lazy(() => import("./pages/dashboard/Reminder"));

export const ProtectRoutes = () => {
  const location = useLocation();
  const isAuthed = isObjectEmpty(JSON.parse(sessionStorage.getItem('userObj')));
  return isAuthed ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export const AuthProtectRoutes = () => {
  const location = useLocation();
  const isAuthed = isObjectEmpty(JSON.parse(sessionStorage.getItem('userObj')));
  return !isAuthed ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );
};

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route element={<AuthProtectRoutes />}>
            <Route path="/" element={<Signin />} />
            <Route
              path="/forget-password"
              element={
                <React.Suspense fallback={<>...</>}>
                  <ForgetPassword />
                </React.Suspense>
              }
            />
            <Route
              path="/change-password"
              element={
                <React.Suspense fallback={<>...</>}>
                  <ChangePassword />
                </React.Suspense>
              }
            />
            <Route element={<Authlayout />}>
              <Route
                path="/begin-registration"
                element={<BeginRegistration />}
              />
              <Route path="/sign-up" element={<Register />} />
            </Route>
          </Route>
          <Route element={<ProtectRoutes />}>
            <Route path="/dashboard" element={<Home />} />
            {/* <Route
              path="/souls"
              element={
                <React.Suspense
                  fallback={<>...</>} // the fallback should be an error page if any error occurs while working on the component
                >
                  <Souls />
                </React.Suspense>
              }
            /> */}
            <Route
              path="/souls/:soulId"
              element={
                <React.Suspense fallback={<>...</>}>
                  <NewConvertDetailsById />
                </React.Suspense>
              }
            />

            <Route
              path="/souls"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Souls />
                </React.Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Profile />
                </React.Suspense>
              }
            />

            <Route
              path="/workers"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Workers />
                </React.Suspense>
              }
            />

            <Route
              path="/workers/:workerId"
              element={
                <React.Suspense fallback={<>...</>}>
                  <WorkerDetailsById />
                </React.Suspense>
              }
            />

            <Route
              path="/admins"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Admins />
                </React.Suspense>
              }
            />
            <Route
              path="/admins/:adminId"
              element={
                <React.Suspense fallback={<>...</>}>
                  <AdminDetailsById />
                </React.Suspense>
              }
            />

            <Route
              path="/dti"
              element={
                <React.Suspense fallback={<>...</>}>
                  <DTI />
                </React.Suspense>
              }
            />
            <Route
              path="/dti/:dtiId"
              element={
                <React.Suspense fallback={<>...</>}>
                  <NewConvertDetailsById />
                </React.Suspense>
              }
            />
            <Route
              path="/newconverts"
              element={
                <React.Suspense fallback={<>...</>}>
                  <NewConvert />
                </React.Suspense>
              }
            />
            <Route
              path="/newconverts/:soulId"
              element={
                <React.Suspense fallback={<>...</>}>
                  <NewConvertDetailsById />
                </React.Suspense>
              }
            />
            <Route
              path="/ministry"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Ministry />
                </React.Suspense>
              }
            />
            <Route
              path="/reminder"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Reminder />
                </React.Suspense>
              }
            />
            <Route
              path="/reminder/unapproved-worker/:workerId"
              element={
                <React.Suspense fallback={<>...</>}>
                  <UnapprovedWorkerDetailsById />
                </React.Suspense>
              }
            />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
