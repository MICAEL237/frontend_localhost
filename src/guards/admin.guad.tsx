import { Outlet, useNavigate } from "react-router";
import type { UseType } from "../features/auth/schemas/userType";
import CurrentUser from "../features/auth/services/me.service";
import { useEffect, useState } from "react";

const Protect = () => {
  const [User, setUser] = useState<UseType>();
  // const userstore = userStore((state) => state.setUser)

  useEffect(() => {
    const Currentuser = async () => {
      const user = await CurrentUser();

      setUser(user.user);
      // userstore(user.user)
    };

    Currentuser();
  }, []);

  const nav = useNavigate();
  if (User?.role != "admin") {
    nav("/login");
  }

  return <Outlet/>
};

export default Protect;
