import { useNavigate } from "react-router";
import type { UseType } from "../../auth/schemas/userType";
import { useEffect, useState } from "react";
import CurrentUser from "../../auth/services/me.service";
import meApiSign from "../services/signalement.me";
import type { TypeSigna } from "../schemas/create.schema";

const MesSignComponent = () => {
  const nav = useNavigate();
  const [User, setUser] = useState<UseType>();
  const [sign, setsign] = useState<TypeSigna[]>();

  // const userstore = userStore((state) => state.setUser)

  useEffect(() => {
    const Currentuser = async () => {
      const user = await CurrentUser();
      const userjson = await user.json();

      setUser(userjson.user);
      // userstore(user.user)
    };
    Currentuser();
  }, []);

  if (!User) {
    nav("/login");
  }

  useEffect(() => {
    const MeSign = async () => {
      const response = await meApiSign();
      const Api = await response.json();
      const sign = Api.data;
      setsign(sign);
      console.log(sign)
    };

    MeSign();
  }, []);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <ul>
        {sign?.map(() => (
          <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              <h1>Hello</h1>
              <span>
                {User?.first_name} {User?.last_name}
              </span>
            </li>

            <li className="list-row">
              <div className="text-4xl font-thin opacity-30 tabular-nums">
                01
              </div>
              <div>
                <img
                  className="size-10 rounded-box"
                  alt="Tailwind CSS list item"
                  src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                />
              </div>
              <div className="list-col-grow">
                <div>Dio Lupa</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  Remaining Reason
                </div>
              </div>
              <button className="btn btn-square btn-ghost">
                <svg
                  aria-label="Play"
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
            </li>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default MesSignComponent;
