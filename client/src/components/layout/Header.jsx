import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import Drawer from "./Drawer";
import toast from "react-hot-toast";
import { LOGOUT_FAIL,LOGOUT_SUCCESS } from '../../redux/constants/user';
import { clearStatus } from '../../redux/slices/userSlice';
import UserMenu from './UserMenu';
export default function Header() {

const navigate = useNavigate();
const dispatch = useDispatch();
  const {user,isAuthenticated,type,error} = useSelector(state=>state.user);
  const [openDrawer,setOpenDrawer] = useState(false);

  useEffect(()=>{

    if(type===LOGOUT_SUCCESS){
      toast.success("Logout successfully");
      dispatch(clearStatus());
      navigate("/auth");
     }
   if(type===LOGOUT_FAIL){
      toast.error(error);
      dispatch(clearStatus());
   }
  
  },[type])



  return (
    <Box >
      <AppBar position="fixed" sx = {{bgcolor:"white"}} elevation={0} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>setOpenDrawer(true)}
          >
            
            <MenuIcon  sx = {{color:"black"}} />
          </IconButton>
          <Drawer open={openDrawer} onClose={()=>setOpenDrawer(false)}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color:"black"}}>
            Ecommerce
          </Typography>
          {isAuthenticated?(
              <UserMenu user={user}/>
          ):(
            <Button >
              <Link to = "/auth">
              Login
              </Link>
            </Button>
          )}
         
        </Toolbar>
      </AppBar>
      
    </Box>
  );
}
