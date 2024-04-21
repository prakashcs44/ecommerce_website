import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LocalMallIcon from '@mui/icons-material/LocalMall';
const Sidebar = () => {
  return (
    <div className="bg-white text-gray-800 h-full w-64 flex flex-col justify-between shadow-md">
      <div className="p-4">
        <Link to="/" className="block mb-8">
          <img  alt="Logo" className="h-12" />
        </Link>

        <Link to="/admin/dashboard" className="flex items-center mb-4 py-2 px-4 rounded-md hover:bg-gray-100">
          <DashboardIcon className="mr-2" />
          Dashboard
        </Link>

        <div className="mb-4">
            <div className="flex ">
            <LocalMallIcon className="mr-2"/>
          <p className="text-sm font-semibold text-gray-600 mb-2 pt-1">Products</p>
            </div>
          
          <ul>
            <li>
              <Link to="/admin/products" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100">
                <PostAddIcon className="mr-2" />
                All
              </Link>
            </li>
            <li>
              <Link to="/admin/product/create" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100">
                <AddIcon className="mr-2" />
                Create
              </Link>
            </li>
          </ul>
        </div>

        <Link to="/admin/orders" className="flex items-center mb-4 py-2 px-4 rounded-md hover:bg-gray-100">
          <ListAltIcon className="mr-2" />
          Orders
        </Link>

        <Link to="/admin/users" className="flex items-center mb-4 py-2 px-4 rounded-md hover:bg-gray-100">
          <PeopleIcon className="mr-2" />
          Users
        </Link>

      
      </div>

     
    </div>
  );
};

export default Sidebar;
