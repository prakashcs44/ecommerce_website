import React, { useState } from "react";
import Metadata from "../../components/layout/MetaData";
import axiosClient from "../../axiosClient";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Form from "../../components/Form";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const link = `/user/password/reset/${token}`;
      await axiosClient.put(link, { password, confirmPassword });

      toast.success("Password reset successfully");
      navigate("/auth");
    } catch (err) {
      const errMessage = err.response.data?.message || "Something went wrong";
      toast.error(errMessage);
    }
  };

  return (
    <>
      <Metadata title="Password - Reset" />
      <Form onSubmit={handleSubmit} buttonText="Reset" title="Password Reset">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Password"
        />

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
      </Form>
    </>
  );
}

export default ResetPassword;
