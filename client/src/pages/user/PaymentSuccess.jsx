import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MetaData from "../../components/layout/MetaData";

const PaymentSuccess = () => {
  return (
    <>
    <MetaData title = "PAYMENT SUCCESS"/>
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <CheckCircleIcon  />
      <Typography variant="h5">Your Order has been Placed successfully </Typography>
      <Button variant="contained">
      <Link to="/orders">View Orders</Link>
      </Button>
      
    </div>
    </>
  );
};

export default PaymentSuccess;