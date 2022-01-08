import Validator from "validatorjs";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __crowdsale } from "../../lib/validation/schema/crowdsale-schema";
import {
  MapFormErrorsInArr,
  SimpleToastError,
  SimpleToastSuccess,
  ToastFormErrors,
} from "../../lib/validation/handlers/error-handlers";
import { buyTokens } from "../../providers/redux/_actions/crowdsale-actions";
import { convertWithDecimal } from "../../lib/general/helper-functions";
import { fetchUserData } from "../../providers/redux/_actions/user-actions";

const Presale = ({ tokenDetails, crowdsaleDetails, userAccount, referrer }) => {
  const dispatch = useDispatch();

  const { totalSupply, name, symbol, decimals } = tokenDetails;
  const { tokenPrice } = crowdsaleDetails;
  // rules for form validation
  const { rules, attributes } = __crowdsale;

  const { data: buyToken } = useSelector(
    (state) => state.buyTokensFromCrowdsale
  );
  console.log(referrer)

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());
    console.log(values);
    let validation = new Validator(values, rules);

    validation.setAttributeNames(attributes);
    if (userAccount == undefined) {
      SimpleToastError("Connect your wallet to proceed!");
      return;
    }

    if (validation.fails()) {
      ToastFormErrors(MapFormErrorsInArr(validation.errors.errors));
    }

    if (validation.passes()) {
      console.log("passed");
      dispatch(buyTokens(values.amount, referrer, userAccount));
    }
  };

  useEffect(() => {
    if (buyToken?.error === true) {
      SimpleToastError(buyToken.message);
    } else if (buyToken?.error === false) {
      SimpleToastSuccess(buyToken.message);
      dispatch(fetchUserData(userAccount));
    }
  }, [buyToken]);
  return (
    <section id="token_sale_06">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="sub-title">
              <h6
                className="wow fadeInUp"
                data-wow-duration="2s"
                data-wow-delay=".2s"
              >
                Pre-sale
              </h6>
              <h2
                className="wow fadeInUp"
                data-wow-duration="2s"
                data-wow-delay=".3s"
              >
                Token Sale
              </h2>
            </div>
          </div>
        </div>
        <div className="row pricing_items">
          <div
            className="col-sm-12 col-md-6 col-lg-6 single-wrapper wow fadeInUp"
            data-wow-duration="2s"
            data-wow-delay=".2s"
          >
            <div className="pricing_single">
              <div className="offer_price">
                <h4>
                  25% Bonus
                  <span className="hover_text">25% Bonus</span>
                  <span className="shape_1" />
                </h4>
              </div>
              <div className="offer_details">
                <span>2 Months</span>
                <h3>03 December 2021</h3>
                {/* <h4>03 December 2021</h4> */}
                <p>Softcap $2M</p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    placeholder="Enter amount of Token"
                  />
                  <button type="submit" className="purchase">
                    Purchase
                  </button>
                </form>
              </div>
              <div className="sale">
                <a href="#" title>
                  Pre sale
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-sm-12 col-md-6 col-lg-6 single-wrapper wow fadeInUp"
            data-wow-duration="2s"
            data-wow-delay=".3s"
          >
            <div className="pricing_single">
              <div className="offer_price">
                <h4>
                  20% Bonus<span className="hover_text">20% Bonus</span>
                  <span className="shape_1" />
                </h4>
              </div>
              <div className="offer_details">
                <span>15 Days</span>
                <h3>28 February 2021</h3>
                <p>Softcap $7M</p>
                <p>
                  Crowdsale address: <br />{" "}
                  xLrxgNww9vD1swWbi8jwhV2bjaL8XtGmTeWMLUgiFCh
                </p>
              </div>
              <div className="sale">
                <a href="#" title>
                  Liquidity Added
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row pricing_bottom">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="pricing_list_wrapper">
              <ul
                className="list-unstyled item_list_1 wow fadeInUp"
                data-wow-duration="2s"
                data-wow-delay=".2s"
              >
                <li>
                  <h3>Pre-Sale starts</h3>
                  <span>03-12-2021</span>
                </li>
                <li>
                  <h3>Pre-Sale End</h3>
                  <span>07-02-2022</span>
                </li>
              </ul>
              <ul
                className="list-unstyled item_list_2 wow fadeInUp"
                data-wow-duration="2s"
                data-wow-delay=".3s"
              >
                <li>
                  <h3>Pre-Sale Terms</h3>
                  <span>First week 25% bonus and then 20% subsequently</span>
                </li>
                <li>
                  <h3>Pre-sale Price</h3>
                  <span>
                    1 {symbol} = {convertWithDecimal(tokenPrice, decimals)} BNB
                  </span>{" "}
                  <br />
                  <span style={{ fontSize: 17 }}>0.5 BNB Minimum</span>
                </li>
              </ul>
              <ul
                className="list-unstyled item_list_3 wow fadeInUp"
                data-wow-duration="2s"
                data-wow-delay=".4s"
              >
                <li>
                  <h3>Pre-sale supply</h3>
                  <span>{totalSupply}</span>
                </li>
                <li>
                  <h3>Network</h3>
                  <span>BSC</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <span className="shape1 header-shape">
        <img src={window.location.origin+"/images/shape/home_6/token_sale.png"} alt="" />
      </span>
      <span className="shape2 header-shape">
        <img src={window.location.origin+"/images/shape/home_6/token_sale_1.png"} alt="" />
      </span>
      <span className="bubble1 header-shape">
        <img src={window.location.origin+"/images/particals_icon/fixed1.png"} alt="" />
      </span>
      <span className="bubble2 header-shape">
        <img src={window.location.origin+"/images/particals_icon/fixed1.png"} alt="" />
      </span>
      <span className="bubble4 header-shape">
        <img src={window.location.origin+"/images/particals_icon/fixed3.png"} alt="" />
      </span>
      <div id="particles5-js" className="particles" />
    </section>
  );
};

export default Presale;
