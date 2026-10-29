import { Link, Outlet } from "react-router";
import House from "../../public/house-svgrepo-com.svg";
// import Footer from "./Footer";
// import Avata



const NavBarUser = (profil?: string,) => {
  return (
    <div className="flex flex-col relative w-screen h-screen">
      <div className="navbar bg-base-100 shadow-sm sm:px-2 lg:px-16 w-full fixed gap-12 ">
      <div className="flex-1 w-full">
        {/* <a className="btn btn-ghost text-xl"></a> */}
        <div className="flex items-center gap-2 ">
          <img src={House} alt="" className="w-12 h-12" />

          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-[#0f172a]">Allô Mairie </h1>
            <h3 className="font-medium text-xs text-[#64748b]">QuartierAlerte • Service Citoyen</h3>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button className="btn btn-square btn-ghost w-34 w-md:w-12 flex gap-4 items-center text-[16px] font-medium ">
        <Link to={""} className="text-[#116534]">Mes signalements</Link>
        </button>

         <button className="btn btn-square btn-ghost w-24 w-md:w-12 flex gap-4 items-center text-[16px] font-medium  text-[##0f172a]">
         <Link to={""} className="text-[#64748b]">Mes votes</Link>
        </button>
        <div className="w-0.5 h-6 bg-[#787e8b]"></div>
        {profil === "" ? (
          <img src={""} alt="" />
        ):(
          <img src="" alt="" />
        ) }
      </div>

      
    </div>
   <div>
     <Outlet/>
   </div>

    </div>

  );
};

export default NavBarUser;
