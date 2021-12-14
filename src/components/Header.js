import React, { useState, useEffect } from "react";
import { _fetchTokenDetails } from "../providers/redux/_actions/token-actions";
import Banner from "./Banner";
import Navbar from "./Navbar";

const Header = ({tokenDetails,userAccount}) => {
  return (
    <header id="header-06" className="header">
      {/* START NAVBAR */}
      <Navbar userAccount={userAccount} />
      {/* END NAVBAR */}
      <Banner tokenDetails={tokenDetails} />
    </header>
  );
};

export default Header;
