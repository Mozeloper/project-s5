import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Signin from "./pages/auth/signin";

export const ProtectRoutes = () => {
  const location = useLocation();
  const isAuthed = isObjectEmpty(JSON.parse(sessionStorage.getItem("userObj")));
  return isAuthed ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export const AuthProtectRoutes = () => {
  const location = useLocation();
  const isAuthed = isObjectEmpty(JSON.parse(sessionStorage.getItem("userObj")));
  return !isAuthed ? (
    <Authlayout>
      <Outlet />
    </Authlayout>
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );
};

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Signin />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
