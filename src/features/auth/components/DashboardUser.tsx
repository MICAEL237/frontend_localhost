import { useEffect, useState } from "react";
import CurrentUser from "../services/me.service";
import type { UseType } from "../schemas/userType";
import { Link } from "react-router";
import handBye from "../../../../public/téléchargement.webp";
import MapIcon from "../../../../public/téléchargement.jpg";
import arrow from "../../../../public/arrow-right-svgrepo-com.svg";

const DasboardUser = () => {
  const [User, setUser] = useState<UseType>();

  const Currentuser = async () => {
    const user = await CurrentUser();

    setUser(user.user);
  };

  useEffect(() => {
    const affiche = async () => {
      await Currentuser();
    };
    affiche();
  }, []);

  if (!User) {
    return (
      <div className="toast toast-top toast-center">
        <div className="alert alert-info">
          <span>Vous n'exister pas</span>
        </div>
        {/* <div className="alert alert-success">
          <span>Message sent successfully.</span>
        </div> */}
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start mt-24 lg:mt-36">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex items-center justify-center gap-2 bg-[#f0fdf4] h-8 w-56 rounded-lg border-[1px] border-[#bbf7d0]">
          <div className="w-2 h-2 bg-[#116534] rounded-full"></div>
          <h3 className="text-[14px] font-medium text-[#116534]">
            Services municipaux connectes
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-black text-[#0f172a] flex gap-2 items-center justify-start">
            <span>Bonjour</span>, <span>{User?.last_name}</span>{" "}
            <span>
              {" "}
              <img className="w-16 h-auto" src={handBye} alt="hand goob bye" />
            </span>
          </h1>
          <h2 className="text-center max-sm:text-sm  text-xl font-medium leading-7 text-[#475569]">
            un probleme sur la voie publique ? Signalez-le en quelques secondes
            a<h2>vos services municipaux pour un cardre de vie soigner.</h2>
          </h2>
        </div>
        
        <Link to="" className="flex items-center gap-4 w-100 h-12 rounded-xl pl-4 bg-[#15803d] text-[18px]"><span><img src={MapIcon} alt="" className="w-8 h-8" /></span>Signaler un probleme dans ma ville <span><img src={arrow} className="w-8 h-8" /></span> </Link>
        
      </div>
    </div>
  );
};

export default DasboardUser;
