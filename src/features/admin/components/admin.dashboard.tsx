import { Link } from "react-router";
import NavBarUser from "../../../components/NavBarUser";

const AdminDashboard = () => {
  return (
    <div className="flex  items-center w-screen h-screen gap-12 relative">
      <div className="max-w-25 ">
        <NavBarUser  />
      </div>

      <div className="mr-12 absolute top-4">
        <div>
          <div className="drawer">
            <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer-1" className="btn btn-ghost btn-success">
                Voir plus 
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-1"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <Link to="/usercommune">Nommer un agent</Link>
                </li>
                <li>
                  <a></a>
                </li>
              </ul>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default AdminDashboard;
