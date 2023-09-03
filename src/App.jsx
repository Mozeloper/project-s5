import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Signin from "./pages/auth/signin";
import Home from "./pages/dashboard/home";
import DashboardLayout from "./components/Layout/dashboard";
import Authlayout from "./components/Layout/auth";
import { isObjectEmpty } from "./utils";
import Souls from "./pages/dashboard/souls";
import Profile from "./pages/dashboard/profile";
import BeginRegistration from "./pages/auth/beginRegistration";
import ForgetPassword from "./pages/auth/forgetPassword";
import NotFound from "./pages/notFound";
import Register from "./pages/auth/Register";
import ChangePassword from "./pages/auth/changePassword";

export const ProtectRoutes = () => {
  const location = useLocation();
  const isAuthed = isObjectEmpty(JSON.parse(sessionStorage.getItem("userObj")));
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
  const isAuthed = isObjectEmpty(JSON.parse(sessionStorage.getItem("userObj")));
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
          <Route element={<AuthProtectRoutes />}>
            <Route path="/" element={<Signin />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
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
            <Route path="/souls" element={<Souls />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
