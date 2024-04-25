import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Metadata from "../../components/layout/MetaData";
import { updatePassword, clearStatus } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";
import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
} from "../../redux/constants/user";
import SensitiveInput from "../../components/SensitiveInput";
import { Button } from "@mui/material";
import ButtonLoader from "../../components/loaders/ButtonLoader";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { type, error } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (type === UPDATE_PASSWORD_SUCCESS) {
      toast.success("Password updated successfully");
      dispatch(clearStatus());
      navigate("/account");
    }
    if (error !== "") {
      toast.error(error);
      dispatch(clearStatus());
    }
  }, [type]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    dispatch(updatePassword(data));
    setOldPassword("");
    setConfirmPassword("");
    setNewPassword("");
    
  };

  return (
    <>
      <Metadata title="Password - Change" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Change Password
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="mb-4">
                <SensitiveInput
                  inputLabel="Old Password"
                  value={oldPassword}
                  onChange={(ev) => setOldPassword(ev.target.value)}
                />
              </div>

              <div className="mb-4">
                <SensitiveInput
                  inputLabel="New Password"
                  value={newPassword}
                  onChange={(ev) => setNewPassword(ev.target.value)}
                />
              </div>

              <div className="mb-4">
                <SensitiveInput
                  inputLabel="Confirm Password"
                  value={confirmPassword}
                  onChange={(ev) => setConfirmPassword(ev.target.value)}
                />
              </div>
            </div>

            <div className="text-center">
              <Button
               sx = {{width:"60%"}}
                type="submit"
                disabled={type === UPDATE_PASSWORD_REQUEST}
                variant = "contained"
              >
                {type === UPDATE_PASSWORD_REQUEST?(
                  <ButtonLoader/>
                ):(
                  "Change"
                )
              }
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
