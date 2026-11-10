import { Route, Routes } from "react-router";
import Register from "../pages/auth/RegisterPage";
import NavBar from "../features/auth/layouts/NavBar";
import LoginPage from "../pages/auth/LoginPage";
import PageUser from "../pages/auth/DashboardUserPage";
import NavBarUser from "../components/NavBarUser";
import SingPageCreate from "../pages/signalemments/create.sign.page";
import UserPage from "../pages/admin/user";
import PageDashAdmin from "../pages/admin/PageDashboard";
import Protect from "../guards/admin.guad";
import HomePage from "../pages/home/Home.page";
import NavBarHome from "../components/NavBarHome";

const AppRouter = () => {
  return (
    <Routes>

      <Route element={<NavBarHome/>}>
          <Route element={<HomePage/>} path="/"></Route>
      </Route>
      <Route element={<NavBar />}>
        <Route element={<LoginPage />} path="/Login"></Route>
        <Route element={<Register />} path="/register"></Route>
      </Route>

      <Route element={<NavBarUser />}>
        <Route element={<PageUser />} path="/DasboardUser"></Route>
        <Route element={<SingPageCreate />} path="/createsign"></Route>
      </Route>

      <Route element={<Protect/>}>
        <Route element={<PageDashAdmin/>}>
        <Route element={<PageDashAdmin/>} path="/admin"></Route>
        <Route element={<UserPage />} path="/usercommune"> </Route>
        <Route> </Route>
      </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
