import  React from 'react';
import Drawer from '@mui/material/Drawer';
import {Link, useLocation} from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Typography } from '@mui/material';
export default function TemporaryDrawer({open,onClose}) {
 

 

 
  return (
    <div>
      <Drawer open={open} onClose={onClose} anchor='left'>
        {<DrawerList/>}
      </Drawer>
    </div>
  );
}



function DrawerList() {

 


  return (
    <div className="flex flex-col gap-4 items-start justify-center px-8 py-8">
      <LinkItem name={"Home"} path={"/"}  icon={<HomeIcon/>}/>
      <LinkItem name={"Products"} path={"/products"} icon={<ShoppingCartIcon/>}/>
      
    </div>
  );
}


function LinkItem({path,name,icon}){
  const currPath =  useLocation().pathname.split("/")[1];
  const activeColor = path==="/"+currPath&&"text-blue-600";

  return (
    <Link to={path} className={`flex items-center gap-2 ${activeColor} hover:text-blue-500 transition duration-300 ease-in-out`}>
    {icon}
    <Typography variant="body1" >{name}</Typography>
  </Link>
  )
}