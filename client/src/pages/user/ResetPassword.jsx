import React, { useState } from "react";
import Metadata from "../../components/layout/MetaData";
import axiosClient from "../../axiosClient";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Form from "../../components/Form";
import SensitiveInput from "../../components/SensitiveInput";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
 

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
      <SensitiveInput inputLabel = "Password" value = {password} onChange = {(ev)=>setPassword(ev.target.value)}/>

      <SensitiveInput inputLabel = "Confirm Password" value = {confirmPassword} onChange = {(ev)=>setConfirmPassword(ev.target.value)}/>
      </Form>
    </>
  );
}

export default ResetPassword;
