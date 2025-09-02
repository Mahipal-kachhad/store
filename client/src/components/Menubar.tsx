import { NavLink } from "react-router-dom";

const Menubar = () => {
  return (
    <div className="container mx-auto max-w-7xl flex justify-between items-center h-15 px-4">
      <h1 className="text-2xl">E-Commerce</h1>
      <ul className="flex justify-end align-middle gap-5">
        <li>
          <NavLink
            to={"/login"}
            className={({ isActive }) =>
              `${isActive ? "bg-amber-500 text-white" : ""} px-5 py-1 rounded`
            }
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/register"}
            className={({ isActive }) =>
              `${isActive ? "bg-amber-500 text-white" : ""} px-5 py-1 rounded`
            }
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              `${isActive ? "bg-amber-500 text-white" : ""} px-5 py-1 rounded`
            }
          >
            Dashboard
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menubar;
