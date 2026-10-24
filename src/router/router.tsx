import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Register from "../pages/auth/RegisterPage";
import NavBar from "../features/auth/layouts/NavBar";
import LoginPage from "../pages/auth/LoginPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<NavBar/>}>
        <Route element={<LoginPage />} path="/Login"></Route>
                <Route element={<Home />} path="/Home"></Route>

        <Route element={<Register/>} path="/register"></Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
