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

 const currPath =  useLocation().pathname.split("/")[1];


  return (
    <div className="flex flex-col gap-4 items-start justify-center px-8 py-8">
      <LinkItem name={"Home"} path={"/"} currPath={currPath} icon={<HomeIcon />}/>
      <LinkItem name={"Products"} path={"/products"} currPath={currPath} icon={<ShoppingCartIcon/>}/>
    </div>
  );
}


function LinkItem({path,currPath,name,icon}){

  const textColor = path==="/"+currPath&&"text-blue-600";

  return (
    <Link to={path} className="flex items-center">
    {icon}
    <Typography variant="body1"  className={`${textColor}`}>{name}</Typography>
  </Link>
  )
}