import { Link, Outlet } from "react-router";
// import NavBarUser from "../../../components/NavBarUser";
import House from "../../../../public/eb59cab6-2d75-43b3-8180-20fa112612e8.jpg";
import { UserStar } from "lucide-react";
import { useState } from "react";

const AdminDashboard = () => {
  const [option, setoption] = useState<boolean>(false)

  const modOption = () =>{
    setoption(!option)
    console.log(option)
  }
  return (
    
    <div className="flex flex-col items-center w-screen h-screen gap-12">
        <div className="navbar  shadow-sm max-md:px-48 sm:px-2 lg:px-8 lg:pl-65 w-full fixed z-100 gap-12 ">
          <div className="flex-1 w-full">
            {/* <a className="btn btn-ghost text-xl"></a> */}
            <div className="flex items-center gap-2 ">
              <img src={House} alt="" className="w-12 h-12" />

              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-[#0f172a]">
                  Allô Mairie{" "}
                </h1>
                <h3 className="font-medium text-xs text-[#64748b] max-md:w-44">
                  QuartierAlerte • Service Citoyen
                </h3>
              </div>
            </div>
          </div>
          <div className="flex items-center max-md:hidden">
            <button className="btn btn-square btn-ghost w-24 w-md:w-12 flex gap-4 items-center text-[16px] font-medium  text-[##0f172a]">
              <Link to="/admin" className="text-[#64748b]">
                Mon espace
              </Link>
            </button>
            <button className="btn btn-square btn-ghost w-34 w-md:w-12 flex gap-4 items-center text-[16px] font-medium ">
              <Link to="/mesign" className="text-[#116534]">
                Mes signalements
              </Link>
            </button>

            <button className="btn btn-square btn-ghost w-24 w-md:w-12 flex gap-4 items-center text-[16px] font-medium  text-[##0f172a]">
              <Link to={""} className="text-[#64748b]">
                Mes votes
              </Link>
            </button>
            <div className="w-0.5 h-6 bg-[#787e8b]"></div>
            {/* { === "" ? (
          <img src={""} alt="" />
        ):(
          <img src="" alt="" />
        ) } */}
          </div>
        </div>


      
        <div className="w-full h-full flex items-start ">
          <div className="my-4 w-36 lg:hidden  flex justify-center items-start">
            <button className="btn btn-ghost btn-accent  lg:hidden px-4  cursor-pointer" onClick={() => modOption()}>Pannel admin</button>
          </div>
          {option === true && (
               <div className="w-1/5 h-full bg-[#0f172a] flex max-md:hidden  flex-col gap-24 items-center justify-start py-2">
          <h1 className=" flex items-center gap-2 text-5xl font-semibold text-[#116534]">Admin <span><UserStar className="w-12 h-12"/></span></h1>
          <ul className="flex flex-col items-start justify-center m-0 gap-8 btn btn-dash btn-accent">
            <li><Link to={"/usercommune"}> Nommer un agent </Link></li>
            <li><Link to={"/assigner"}> assigner un signalement</Link></li>
            <li><Link to={"/macommune"}>Ma commune</Link></li>
            <li><Link to={"/agentsign"}>Agent et signalement</Link></li>
            <li><Link to={""}></Link></li>
          </ul>
          </div>

          )}
          <div className="w-1/5 h-full bg-[#0f172a] flex max-md:hidden  flex-col gap-24 items-center justify-start py-2 ">
          <h1 className=" flex items-center gap-2 text-5xl font-semibold text-[#116534]">Admin <span><UserStar className="w-12 h-12"/></span></h1>
          <ul className="flex flex-col items-start justify-center m-0 gap-8">
            <li className="w-full"><Link to={"/usercommune"} className="btn btn-dash btn-accent w-full text-center"> Nommer un agent </Link></li>
            <li className="w-full"><Link to={"/assigner"} className="btn btn-dash btn-accent w-full text-center"> assigner un signalement</Link></li>
            <li className="w-full"><Link to={"/macommune"} className="btn btn-dash btn-accent w-full text-center">Ma commune</Link></li>
            <li className="w-full"><Link to={"/agentsign"} className="btn btn-dash btn-accent w-full text-center">Agent et signalement</Link></li>
            <li className="w-full"><Link to={""}></Link></li>
          </ul> 
          </div>
          <Outlet />
        </div>
    </div>
  );
};

export default AdminDashboard;
