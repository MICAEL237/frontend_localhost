import { Route, Routes } from "react-router";
import Register from "../pages/auth/RegisterPage";
import NavBar from "../features/auth/layouts/NavBar";
import LoginPage from "../pages/auth/LoginPage";
import PageUser from "../pages/auth/DashboardUserPage";
import NavBarUser from "../components/NavBarUser";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<NavBar />}>
        <Route element={<LoginPage />} path="/Login"></Route>
        <Route element={<Register />} path="/register"></Route>
      </Route>

      <Route element={<NavBarUser/>}>
        <Route element={<PageUser />} path="/DasboardUser"></Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
