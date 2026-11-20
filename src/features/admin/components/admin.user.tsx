import { useEffect, useState } from "react";
import type { userType } from "../schemas/user.schema";
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
      console.log("debut");
      const response = await UserApi();
      console.log(response);
      const data = await response!.json();
      const m = data.user;
      console.log("ici", m);
      setuser(m);
    };

    CallApi();
  }, []);

  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#f0f0f0]">
        <span className="loading loading-ball accent-accent"></span>
        <span className="loading loading-ball accent-accent"></span>
        <span className="loading loading-ball accent-accent"></span>
      </div>
    );
  }

  const test = (email: string) => {
    const data = { email: email, role: roles! };
    console.log("les datas av", data);

    const updateRole = UpdateRole(data);
    console.log("les datas", data);
    return updateRole;
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <div className="overflow-x-auto rounded-xl border border-[#787e8b]/30 shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
        <table className="w-full min-w-[850px] border-collapse">
          {/* HEADER */}
          <thead>
            <tr className="bg-[#0f172a]">
              <th className="px-7 py-6 text-left text-xs font-semibold uppercase tracking-[0.15em] text-white">
                Utilisateur
              </th>

              <th className="px-7 py-6 text-left text-xs font-semibold uppercase tracking-[0.15em] text-white">
                Adresse email
              </th>

              <th className="px-7 py-6 text-left text-xs font-semibold uppercase tracking-[0.15em] text-white">
                Téléphone
              </th>

              <th className="px-7 py-6 text-left text-xs font-semibold uppercase tracking-[0.15em] text-white">
                Rôle actuel
              </th>

              <th className="px-7 py-6 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white">
                Attribution
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="bg-white">
            {user.map((user: userType, index: number) => (
              <tr
                key={user.email}
                style={{
                  animation: `fadeSlide 0.5s ease ${index * 0.07}s both`,
                }}
                className="
            group
            border-b border-[#787e8b]/20
            transition-all duration-300 ease-out
            hover:bg-[#116534]/[0.04]
          "
              >
                {/* UTILISATEUR */}
                <td className="px-7 py-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-xl bg-[#0f172a]
                text-white font-bold text-sm
                transition-all duration-300
                group-hover:bg-[#116534]
                group-hover:rounded-full
                group-hover:scale-105
              "
                    >
                      {user.first_name?.charAt(0)}
                      {user.last_name?.charAt(0)}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span
                        className="
                  font-semibold text-[#0f172a]
                  transition-colors duration-300
                  group-hover:text-[#116534]
                "
                      >
                        {user.first_name} {user.last_name}
                      </span>

                      <span className="text-[11px] text-[#787e8b]">
                        Membre de la commune
                      </span>
                    </div>
                  </div>
                </td>

                {/* EMAIL */}
                <td className="px-7 py-6">
                  <span className="text-sm text-[#787e8b] transition-colors duration-300 group-hover:text-[#0f172a]">
                    {user.email}
                  </span>
                </td>

                {/* TELEPHONE */}
                <td className="px-7 py-6">
                  <span className="text-sm font-medium text-[#0f172a]">
                    {user.tel || "Non renseigné"}
                  </span>
                </td>

                {/* ROLE */}
                <td className="px-7 py-6">
                  <select
                    onChange={(e) => setrole(e.target.value)}
                    className="
                select select-accent
                w-full max-w-[190px]
                rounded-lg
                border border-[#787e8b]/40
                text-[#0f172a]
                font-medium text-xs
                outline-none
                transition-all duration-300
                hover:border-[#116534]
                focus:border-[#116534]
                focus:ring-2 focus:ring-[#116534]/15
              "
                  >
                    <option value={user.role}>{user.role}</option>

                    {role.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </td>

                {/* CONFIRMER */}
                <td className="px-7 py-6 text-center">
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

          {/* FOOTER */}
          <tfoot>
            <tr className="bg-[#116534]">
              <td colSpan={5} className="px-7 py-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="
                flex h-8 w-8 items-center justify-center
                rounded-lg bg-white/15
                text-white text-sm font-bold
              "
                    >
                      {user.length}
                    </span>

                    <span className="text-sm font-medium text-white">
                      Utilisateurs enregistrés
                    </span>
                  </div>

                  <span className="text-xs font-medium text-white/70">
                    Allô Mairie • Gestion des accès
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>

        <style>
          {`
      @keyframes fadeSlide {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}
        </style>
      </div>
    </div>
  );
};

export default UserApiComponent;
