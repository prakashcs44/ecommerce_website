import React, { useState } from "react";
import defaultUserImg from "../../assets/default_user.jpg"
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";

function UserMenu({ user }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const orderFunc = () => {
    navigate("/orders");
  };

  const cartFunc = () => {
    navigate("/cart");
  };

  const accountFunc = () => {
    navigate("/account");
  };

  const logoutFunc = () => {
    dispatch(logout());
  };

  const dashboardFunc = () => {
    navigate("/admin/dashboard");
  };

  const options = [
    {
      title: "Account",
      icon: <PersonIcon />,
      func: accountFunc,
    },
    {
      title: "Cart",
      icon: <ShoppingCartIcon />,
      func: cartFunc,
    },
    {
      title: "Orders",
      icon: <ListAltIcon />,
      func: orderFunc,
    },
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      func: dashboardFunc,
    },
    {
      title: "Logout",
      icon: <ExitToAppIcon />,
      func: logoutFunc,
    },
  ];

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={user?.name}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.name} src={user?.avatar?.url||defaultUserImg} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {options
          .filter((option) =>
            option.title === "Dashboard"
              ? user?.role === "admin"
                ? true
                : false
              : true
          )
          .map((option) => (
            <MenuItem
              key={option}
              onClick={() => {
                handleCloseUserMenu();
                option.func();
              }}
            >
              <div className="flex gap-1">
                {option.icon}
                <Typography textAlign="center">{option.title}</Typography>
              </div>
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
}

export default UserMenu;
