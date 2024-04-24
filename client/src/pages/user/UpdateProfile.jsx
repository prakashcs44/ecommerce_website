import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, TextField } from "@mui/material";
import { updateProfile,clearStatus } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Metadata from "../../components/layout/MetaData";
import Form from "../../components/Form";
import toast from "react-hot-toast";
function UpdateProfile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState();
  const dispatch = useDispatch();
  const { user,status,error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(user.email);
    setName(user.name);
    setAvatarPreview(user?.avatar?.url);
  }, [user]);


  useEffect(()=>{
    
     if(status==="success"){
       toast.success("Profile updated successfully");
       navigate("/account");
       dispatch(clearStatus());
       
     }
     else if(status==="fail"){
      toast.error(error)
      dispatch(clearStatus());
     }

  },[status])

  const handleSubmit = (event) => {
    event.preventDefault();

    const myForm = new FormData();
    myForm.append("email", email);
    myForm.append("name", name);
    myForm.append("avatar", avatar);
    dispatch(updateProfile(myForm));

    // Clear form fields
    setEmail("");
    setAvatar(null);
    setName("");
    
  };

  const onAvatarChange = (ev) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === FileReader.DONE) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(ev.target.files[0]);
  };

  return (
    <>
      <Metadata title="Profile - Update" />
      <Form title="Update Profile" buttonText="Update" onSubmit={handleSubmit} buttonDisable={status==="loading"}>
       
          <TextField
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            label="Email"
          />
      

      
          <TextField
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            fullWidth
          />
       

        <div className="mb-4 flex gap-3 items-center">
          <label htmlFor="avatar" className="">
            <Avatar src={avatarPreview} alt="u" />
          </label>

          <input
            id="avatar"
            name="avatar"
            type="file"
            onChange={onAvatarChange}
            className=""
            placeholder="Avatar"
          />
        </div>
      </Form>
    </>
  );
}

export default UpdateProfile;
