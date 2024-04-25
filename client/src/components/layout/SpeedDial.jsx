import  React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Avatar } from '@mui/material';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useNavigate} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import {logout} from "../../redux/slices/userSlice";


export default function BasicSpeedDial() {

   const {user} = useSelector(state=>state.user);
   const dispatch = useDispatch();
  const navigate = useNavigate();


 

   const orderFunc = ()=>{
     navigate("/orders");
   }

   const cartFunc = ()=>{
    navigate("/cart")
   }

   const accountFunc = ()=>{
    navigate("/account");
   }

   const logoutFunc = ()=>{
    dispatch(logout());
   }

   const dashboardFunc = ()=>{
    navigate("/admin/dashboard");
   }

  const actions = [
    { icon: < ListAltIcon/>, name: 'Orders',func:orderFunc},
    { icon: <ShoppingCartIcon />, name: 'Cart',func:cartFunc },
    { icon: <PersonIcon/>, name: 'Account',func:accountFunc },
    { icon: <ExitToAppIcon/>, name: 'Logout',func:logoutFunc },
  ];

  if(user&&user.role==="admin"){
    actions.push({
      icon:<DashboardIcon/>,name:"Dashboard",func:dashboardFunc
    })
  }




  return (
    <Box sx = {{position:"absolute",right:"2em",zIndex:100,top:"0.8em"}} >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        icon={<Avatar src={user?.avatar?.url} sx={{width:"100%",height:"100%"}}/>}
        direction='down'
        
       
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
