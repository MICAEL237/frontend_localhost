import { Outlet } from "react-router";
import House from "../../../../public/house-svgrepo-com.svg";
import shieldCheck from  "../../../../public/shield-check-svgrepo-com.svg";


const NavBar = () => {
  return (
    <div className="flex flex-col relative">
      <div className="navbar bg-base-100 shadow-sm sm:px-2 lg:px-16 w-full fixed gap-12 ">
      <div className="flex-1 w-full">
        {/* <a className="btn btn-ghost text-xl"></a> */}
        <div className="flex items-center gap-2 ">
          <img src={House} alt="" className="w-12 h-12" />

          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-[##0f172a]">Allô Mairie </h1>
            <h3 className="font-medium text-xs text-[#64748b]">QuartierAlerte • Service Citoyen</h3>
          </div>
        </div>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost w-64 w-md:w-12 flex gap-2 items-center">
          <img src={shieldCheck} alt="shieldCheck" className="w-6 h-6"/>
         <h1 className="w-full font-semibold">Portail Officiel d'Accès Sécurisé</h1>
        </button>
      </div>

      
    </div>
    <Outlet/>
    </div>
  );
};

export default NavBar;
