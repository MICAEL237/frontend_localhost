import { useEffect, useState } from "react";
import type {  userType } from "../schemas/user.schema";
import UserApi from "../services/admin.users";
// import Input from "../../../components/Input";
// import Button from "../../../components/Button";
import UpdateRole from "../services/update.role";

const UserApiComponent = () => {
  const [user, setuser] = useState<userType[] | undefined>();
  // const [email, setemail] = useState<string | undefined>();
  const [roles, setrole] = useState<string>();

  const role = ["citoyen", "agent_municipale", "admin"];

  //

  useEffect(() => {
    const CallApi = async () => {
      const response = await UserApi();
      const data = response.user;
      console.log(data);
      setuser(data);
    };

    CallApi();
  }, []);

  if (!user) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#f0f0f0]">
        <span className="loading loading-ball accent-accent"></span>
        <span className="loading loading-ball accent-accent"></span>
        <span className="loading loading-ball accent-accent"></span>
      </div>
    );
  }

  const test = (email: string) => {
    const data = { email: email, role: roles! };
    const updateRole = UpdateRole(data);
    console.log(data);
    return updateRole;
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <table border={3} className="max-sm:w-100">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>tel</th>
            <th>role</th>
            <th>Nommer</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user: userType) => (
            <tr>
              <td>
                 <input
                  type="text"
                  placeholder={`${user.first_name} ${user.last_name}`}
                  className="input input-accent"
                />
             
                  {" "}
              </td>
              <td>
                 <input
                  type="text"
                  placeholder={user.tel}
                  className="input input-accent"
                />
                  

              </td>
              <td>
                <input
                  type="text"
                  placeholder={user.email}
                  className="input input-accent"
                />
              </td>

              <td>
                {" "}
                <select
                  onChange={(e) => setrole(e.target.value)}
                  className="select select-accent"
                >
                  <option value={user.role}>Choississez un nouveau role</option>
                  {role.map((val) => (
                    <option value={val}> {val} </option>
                  ))}{" "}
                </select>{" "}
              </td>
              <td>
                <button
                  type="button"
                  className="w-full h-12 btn btn-ghost btn-success"
                  onClick={() => test(user.email)}
                >
                  confirmer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserApiComponent;
