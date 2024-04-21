import React, { useState } from "react";
import Metadata from "../../components/layout/MetaData";
import axiosClient from "../../axiosClient";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Form from "../../components/Form";
import {TextField} from "@mui/material"

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
   const [mailSending,setMailSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
   setMailSending(true);
    try {
      const link = "/user/password/forgot";
      await axiosClient.post(link, { email });
      toast.success("Email sent successfully");
    } catch (err) {
      const errMessage = err.response.data?.message || "Something went wrong";

      toast.error(errMessage);
    }
    finally{
      setMailSending(false);
    }
  };

  return (
    <>
      <Metadata title="Forgot - Password" />
      <Form buttonText="Send" title = "Forgot Password" onSubmit={handleSubmit} buttonDisable={mailSending}>
      <TextField
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
        />
       
      </Form>
    </>
  );
}

export default ForgotPassword;
