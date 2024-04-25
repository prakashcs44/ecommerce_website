import React, { useEffect, useState } from 'react';
import { Button} from '@mui/material';
import { Update } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { getAllUsers} from '../../redux/api/usersAdmin'; 
import { useNavigate } from 'react-router-dom';
import NothingToShow from '../../components/NothingToShow';


function UsersAll() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllUsers();
        setUsers(res);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    setLoading(true);
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  function handleUpdate(userId) {
    navigate(`/admin/user/${userId}`);
}




  if (users.length === 0) {
    return (
      <NothingToShow title = "No Users" redirect = "/admin/users/create"  redirectTitle = "Create User"/>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center pb-6 border-b-2">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-4 shadow-md rounded-lg pt-8">
            <h2 className="text-lg font-semibold mb-2">Username: {user.name}</h2>
            <p className="text-gray-600 mb-2">Email: {user.email}</p>
            <p className="text-gray-600 mb-2">Joined at: {user.createdAt?.split("T")[0]}</p>
            <div className="flex justify-end gap-2">
            

              <Button
                variant="outlined"
                color="primary"
                startIcon={<Update />}
                onClick={() => handleUpdate(user._id)}
                className="ml-2"
                disabled = {loading}
              >
                Update Role
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersAll;
