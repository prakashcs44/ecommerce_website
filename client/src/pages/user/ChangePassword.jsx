import React,{ useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import Metadata from "../../components/layout/MetaData"
import { updatePassword,clearStatus } from '../../redux/slices/userSlice';
import toast from "react-hot-toast";
import { UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS }
from "../../redux/constants/user";


function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const {type,error} = useSelector(state=>state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
  
    useEffect(()=>{
       if(type === UPDATE_PASSWORD_SUCCESS){
          toast.success("Password updated successfully");
          dispatch(clearStatus());
       }
       if(error!==""){
        toast.error(error);
        dispatch(clearStatus());
       }
    },[type]);

    
   
    const handleSubmit = (event) => {
  
      event.preventDefault();
      const data={
        oldPassword,
        newPassword,
        confirmPassword,
      }
       dispatch(updatePassword(data));
       setOldPassword("");
       setConfirmPassword("");
       setNewPassword("");
       navigate("/account");
    };
  
  
   
  
    return (
        <>
         <Metadata title = "Password - Change"/>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Change Password
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-4">
              <div className="mb-4">
                <label htmlFor="old-password" className="sr-only">
                  Old Password
                </label>
                <input
                  id="old-password"
                  name="old-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Old Password"
                />
              </div>
  
              <div className="mb-4">
                <label htmlFor="new-password" className="sr-only">
                  New Password
                </label>
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
  
  
  
             
  
             
                    
  
  
  
            </div>
  
            <div>
              <button
                type="submit"
                disabled = {type===UPDATE_PASSWORD_REQUEST}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
               Change
              </button>
            </div>
          </form>
        
        </div>
      </div>
      </>
    );
}

export default ChangePassword;
