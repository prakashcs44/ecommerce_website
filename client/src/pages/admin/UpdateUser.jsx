import React, { useEffect, useRef, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { getSingleUser,updateUserRole } from "../../redux/api/usersAdmin";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ButtonLoader from "../../components/loaders/ButtonLoader";
import Metadata from "../../components/layout/MetaData";

const SingleProductPage = () => {
  const [role, setRole] = useState();
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const roleRef = useRef();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSaveRole = async () => {

    setLoading(true);
      
    try{
     
      const res = await updateUserRole({id:user._id,data:{role}});
      setUser(res);
      roleRef.current = role;
      toast.success("User updated successfully");
    }

    catch(err){
      setRole(roleRef.current);
      toast.error(err.message);

    }
    setEdit(false);
    setLoading(false);

    
  };

  const handleCancelRole = () => {
    setEdit(false);
    setRole(roleRef.current);
  };

  const handleEditRole = () => {
    setEdit(true);
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await getSingleUser(id);
      setUser(res);
      setRole(res.role);
      roleRef.current = res.role;
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
    <MetaData title = "UPDATE USER"/>
    <div className="container mx-auto mt-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center pb-6 border-b-2">
          User Details
        </h1>
        <div className="mb-4">
          <p className="font-semibold">User ID:</p>
          <p>{user._id}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Name:</p>
          <p>{user.name}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">User Role:</p>
          {edit?(
                 <TextField
                 variant="outlined"
                 fullWidth
                 value={role}
                 onChange={handleRoleChange}
               />
          ):(
            <p>{role}</p>
          )}
         
        </div>
        <div className="flex gap-2">
          {edit ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveRole}
                startIcon={<Save />}
                disabled = {loading}
              >
                {loading?(
                  <ButtonLoader/>
                ):(
                  "Save"
                )}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleCancelRole}
                startIcon={<Cancel />}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleEditRole}
              startIcon={<Edit />}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default SingleProductPage;
