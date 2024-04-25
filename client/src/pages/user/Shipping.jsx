import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../components/layout/MetaData";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import CheckoutSteps from "../../components/CheckoutSteps";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../../redux/slices/cartSlice";
import { Button,TextField } from "@mui/material";

const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo?.address);
  const [city, setCity] = useState(shippingInfo?.city);
  const [state, setState] = useState(shippingInfo?.state);
  const [country, setCountry] = useState(shippingInfo?.country);
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo);
  const navigate = useNavigate();
  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      toast.error("Phone Number should be 10 digits long");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
   navigate("/order/confirm");
  };

  return (
    <>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <div className="container mx-auto px-4 py-4 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Shipping Details</h2>

        <form onSubmit = {shippingSubmit}>
          <div className="mb-4 flex items-center">
            <HomeIcon className="inline-block mr-2" />
            <TextField
             fullWidth
              type="text"
              label="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-4 flex items-center">
            <LocationCityIcon className="inline-block mr-2" />
            <TextField
             fullWidth
              type="text"
              label="City"
             
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="mb-4 flex items-center">
            <PinDropIcon className="inline-block mr-2" />
            <TextField
              type="number"
              label="Pin Code"
              fullWidth
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>

          <div className="mb-4 flex items-center">
            <PhoneIcon className="inline-block mr-2" />
            <TextField
              type="number"
              label="Phone Number"
             fullWidth
              required
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>

          <div className="mb-4 flex items-center">
            <PublicIcon className="inline-block mr-2" />
            <select
              className="border border-gray-300 px-4 py-2 w-full rounded-md"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
              {Country && Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {country && (
            <div className="mb-4 flex items-center">
              <TransferWithinAStationIcon className="inline-block mr-2" />
              <select
                className="border border-gray-300 px-4 py-2 w-full rounded-md"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                {State && State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="text-center">
          <Button 
          type="submit"
           sx = {{width:"60%"}}
          disabled = {!state}
          variant = "contained"
          
          >
        
           Continue
          </Button>
          </div>
        
        </form>
      </div>
    </>
  );
};

export default Shipping;
