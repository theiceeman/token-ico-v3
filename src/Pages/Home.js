import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { _fetchTokenDetails } from "../providers/redux/_actions/token-actions";
import { Auth } from "../lib/ethers/Auth";
import "../components/Header-scripts"
import About from "../components/About";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Partners from "../components/Partners";
import Preloader from "../components/Preloader";
import Presale from "../components/Presale";
import Roadmap from "../components/Roadmap";
import Tokenomics from "../components/Tokenomics";
import Whitepaper from "../components/Whitepaper";
import { fetchCrowdsaleDetails } from "../providers/redux/_actions/crowdsale-actions";
import { authenticateUser } from "../providers/redux/_actions/user-actions";
import { SimpleToastError, SimpleToastSuccess } from "../lib/validation/handlers/error-handlers";
import Login from "../components/Login";
import { validateReferrer } from "../providers/redux/_actions/timelock-actions";

const Home = (props) => {
  const dispatch = useDispatch();
  const { id:ref } = useParams();

  const { data: token } = useSelector((state) => state.FetchTokenDetails);
  const [tokenDetails, setTokenDetails] = useState({});

  const { data: crowdsale } = useSelector(
    (state) => state.FetchCrowdsaleDetails
  );
  const [crowdsaleDetails, setCrowdsaleDetails] = useState({});

  const { data: Auth } = useSelector((state) => state.UserAuth);
  const [userAccount, setUserAccount] = useState();

  if(ref){
    validateReferrer(ref)
    console.log(ref)

  }

  // track user account auth
  useEffect(() => {
    if (Auth?.error === true) {
      SimpleToastError(Auth.message);
    } else if (Auth?.error === false) {
      setUserAccount(Auth.message)
    }
  }, [Auth]);
  // track token contract
  useEffect(() => {
    token && setTokenDetails(token);
  }, [token]);
  // track crowdsale contract
  useEffect(() => {
    crowdsale && setCrowdsaleDetails(crowdsale);
  }, [crowdsale]);

  // fetch contract details
  useEffect(() => {
    dispatch(authenticateUser());
    dispatch(_fetchTokenDetails());
    dispatch(fetchCrowdsaleDetails());
  }, []);
  return (
    <div>
      {/* Preloader */}
      <Preloader />
      <Header tokenDetails={tokenDetails} userAccount={userAccount}/>
      {/* End Header */}
      <About />
      {/* End welcome_cryptonic */}
      <Whitepaper />
      {/* End whitepaper */}
      <Presale
        tokenDetails={tokenDetails}
        crowdsaleDetails={crowdsaleDetails}
        userAccount={userAccount}
      />
      {/* End token_sale */}
      <Tokenomics />
      {/* End token_distribution */}
      <Roadmap />
      {/* End roadmap */}
      <Login/>
      {/* Login & signup */}
      <Partners />
      {/* End companis_supported */}
      <Footer />
      {/* ./ End Footer Area*/}
    </div>
  );
};

export default Home;
