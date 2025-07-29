import { Link } from "react-router-dom";

const Sidebar = ({ role, loading }: { role: string; loading: boolean }) => {
  if (loading) {
    return (
      <aside className="w-64 bg-gray-800 text-white h-full min-h-screen flex-shrink-0 flex items-center justify-center">
        <div className="text-lg animate-pulse">Loading...</div>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-gray-800 text-white h-full min-h-screen flex-shrink-0">
      <div className="p-4 font-bold text-lg border-b border-gray-700">
        Dashboard
      </div>
      <nav className="mt-4">
        {(role === "vendor" || role === "admin") && (
          <div className="mb-4">
            <div className="font-semibold px-4 py-2">Vendor</div>
            <ul className="pl-4">
              <li className="py-1">
                <Link
                  to="/dashboard/vendor/add-product"
                  className="hover:text-blue-400"
                >
                  Add Product
                </Link>
              </li>
              <li className="py-1">
                <Link
                  to="/dashboard/vendor/update-product"
                  className="hover:text-blue-400"
                >
                  Update Product
                </Link>
              </li>
            </ul>
          </div>
        )}
        {role === "admin" && (
          <div>
            <div className="font-semibold px-4 py-2">Admin</div>
            <ul className="pl-4">
              <li className="py-1">
                <Link
                  to="/dashboard/vendor/add-category"
                  className="hover:text-blue-400"
                >
                  Add Category
                </Link>
              </li>
              <li className="py-1">
                <Link
                  to="/dashboard/admin/user-list"
                  className="hover:text-blue-400"
                >
                  User List
                </Link>
              </li>
              <li className="py-1">
                <Link
                  to="/dashboard/admin/update-user"
                  className="hover:text-blue-400"
                >
                  Update User
                </Link>
              </li>
              <li className="py-1">
                <Link
                  to="/dashboard/admin/delete-user"
                  className="hover:text-blue-400"
                >
                  Delete User
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
