import { Link, Outlet } from "react-router";
import House from "../../public/eb59cab6-2d75-43b3-8180-20fa112612e8.jpg";

const NavBarHome = () => {
  return (
    <div className="flex flex-col  items-end relative max-w-screen h-screen">
        <div className="navbar bg-base-100 shadow-sm sm:px-2 lg:px-16 w-full fixed gap-12 ">
          <div className="flex-1 w-full">
            {/* <a className="btn btn-ghost text-xl"></a> */}
            <div className="flex items-center gap-2 ">
              <img src={House} alt="" className="w-16 h-16 " />

              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-[#0f172a]">
                  Allô Mairie{" "}
                </h1>
                <h3 className="font-medium text-xs text-[#64748b]">
                  QuartierAlerte • Service Citoyen
                </h3>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button className="btn btn-square btn-ghost w-24 w-md:w-12 flex gap-4 items-center text-[16px] font-medium  text-[##0f172a]">
              <Link to="/login" className="text-[#64748b]">
                Conexion
              </Link>
            </button>
            <button className="btn btn-square btn-ghost w-34 w-md:w-12 flex gap-4 items-center text-[16px] font-medium ">
              <Link to="/register" className="text-[#116534]">
                Inscription
              </Link>
            </button>

            <button className="btn btn-square btn-ghost w-24 w-md:w-12 flex gap-4 items-center text-[16px] font-medium  text-[##0f172a]">
              <Link to={""} className="text-[#64748b]">
                Mes votes
              </Link>
            </button>
            <div className="w-0.5 h-6 bg-[#787e8b]"></div>
          </div>
        </div>

      <div className=" w-full h-full flex items-center justify-between">
        <div className="h-100">
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default NavBarHome;
