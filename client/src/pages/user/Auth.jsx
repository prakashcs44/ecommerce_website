import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, register, clearStatus } from "../../state/slices/userSlice";
import { Avatar, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ButtonLoader from "../../components/loaders/ButtonLoader"

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState();
  const navigate = useNavigate();
  const { isAuthenticated, status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (status === "success" && isAuthenticated) {
      toast.success("Logged in successfully");
      dispatch(clearStatus());
      navigate("/account");
    }

    if (error !== "") {
      toast.error(error);
      dispatch(clearStatus());
    }
  }, [status]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      const data = { email, password };
      dispatch(login(data));
    } else {
      const myForm = new FormData();
      myForm.append("email", email);
      myForm.append("password", password);
      myForm.append("name", name);
      myForm.append("avatar", avatar);
      dispatch(register(myForm));
    }
    // Clear form fields
    setEmail("");
    setPassword("");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Sign in to your account" : "Register an account"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-4 text-center">
            <div className="mb-4">
              <TextField
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </div>

            <div className="mb-4">
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </div>

            {!isLogin && (
              <>
                <div className="mb-4">
                  <TextField
                    type="text"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                </div>

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
              </>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              disabled={status === "loading"}
              type="submit"
              variant="contained"
              sx = {{width:"60%"}}
            >
              {status==="loading"?(
                <ButtonLoader/>
              ):(
                isLogin ? "Sign in" : "Register"
              )}
              
            </Button>
          </div>
        </form>
        <div className="text-center flex flex-col">
          <Button
            onClick={() => {
              setIsLogin(!isLogin);
              setEmail("");
              setPassword("");
              setAvatar(null);
              setName("");
            }}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </Button>
          {isLogin && (
            <Button>
              <Link to="/password/forgot">Forgot Password</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;