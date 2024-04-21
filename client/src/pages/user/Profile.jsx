import React from 'react';
import MetaData from '../../components/layout/MetaData';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile() {
  const { user } = useSelector(state => state.user);





  return (
    <>
      <MetaData title={`${user?.name}'s Profile`} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col  items-center">
          <div className="text-center pt-8">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <img src={user?.avatar?.url} alt={user?.name} className="mx-auto mt-4 w-32 h-32 rounded-full border-4 border-blue-500" />
            <Link to="/edit-profile" className="block mt-4 text-blue-500 hover:underline">Edit Profile</Link>
          </div>
          <div className="px-6 py-8">
            <div className="mb-4 flex items-center gap-3">
              <h4 className="text-lg font-semibold text-gray-800">Full Name</h4>
              <p className="text-gray-600">{user?.name}</p>
            </div>
            <div className="mb-4 flex items-center gap-3">
              <h4 className="text-lg font-semibold text-gray-800">Email</h4>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <div className="mb-4 flex items-center gap-3">
              <h4 className="text-lg font-semibold text-gray-800">Joined on</h4>
              <p className="text-gray-600">{user?.createdAt?.split("T")[0]}</p>
            </div>
          </div>
          <div className="px-6 py-5  border-t border-gray-200 flex  items-center gap-10">
            <Link to="/orders" className="text-blue-500 hover:underline">My Orders</Link>
            <Link to="/password/update" className="text-blue-500 hover:underline">Change Password</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
