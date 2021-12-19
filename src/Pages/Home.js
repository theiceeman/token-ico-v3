import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { _fetchTokenDetails } from "../providers/redux/_actions/token-actions";
import "../components/home/Header-scripts";
import About from "../components/home/About";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import Partners from "../components/home/Partners";
import Preloader from "../components/home/Preloader";
import Presale from "../components/home/Presale";
import Login from "../components/home/Login";
import Roadmap from "../components/home/Roadmap";
import Tokenomics from "../components/home/Tokenomics";
import Whitepaper from "../components/home/Whitepaper";
import Dashboard from "../components/home/Dashboard";
import { fetchCrowdsaleDetails } from "../providers/redux/_actions/crowdsale-actions";
import {
  authenticateUser,
  validateReferrer,
} from "../providers/redux/_actions/user-actions";
import {
  SimpleToastError,
  SimpleToastSuccess,
} from "../lib/validation/handlers/error-handlers";

const Home = (props) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [referrer, setReferrer] = useState(null);

  const { data: token } = useSelector((state) => state.FetchTokenDetails);
  const [tokenDetails, setTokenDetails] = useState({});

  const { data: crowdsale } = useSelector(
    (state) => state.FetchCrowdsaleDetails
  );
  const [crowdsaleDetails, setCrowdsaleDetails] = useState({});

  const { data: Auth } = useSelector((state) => state.UserAuth);
  const [userAccount, setUserAccount] = useState();
  console.log(userAccount)

  useEffect(async () => {
    if (id) {
      let verifyReferrer = await validateReferrer(id);
      if (!verifyReferrer.error) {
        setReferrer(id);
      }
    }
  }, [id]);

  // track user account auth
  useEffect(() => {
    if (Auth?.error === true) {
      SimpleToastError(Auth.message);
    } else if (Auth?.error === false) {
      setUserAccount(Auth.message);
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
      <Header tokenDetails={tokenDetails} userAccount={userAccount} />
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
      <Login referrer={referrer} />
      {/* Login & signup */}
      <Partners />
      {/* End companis_supported */}
      <Footer />
      {/* ./ End Footer Area*/}
      <Dashboard/>
    </div>
  );
};

export default Home;
