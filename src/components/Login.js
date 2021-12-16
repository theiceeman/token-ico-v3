import Validator from "validatorjs";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __register } from "../lib/validation/schema/auth-schema";
import {
  MapFormErrorsInArr,
  SimpleToastError,
  SimpleToastSuccess,
  ToastFormErrors,
} from "../lib/validation/handlers/error-handlers";
import { signUp } from "../providers/redux/_actions/user-actions";
const Login = () => {
    // https://www.pomicoin.com/app/invite?ref=UD01303
  const dispatch = useDispatch();
  const { rules, attributes } = __register;

//   const user_referrer = (ref) ? ref : null;

  const handleRegister = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());
    console.log(values);
    let validation = new Validator(values, rules);

    validation.setAttributeNames(attributes);

    if (validation.fails()) {
      ToastFormErrors(MapFormErrorsInArr(validation.errors.errors));
    }

    if (validation.passes()) {
      console.log("passed");
      signUp(data);
    }
  };

  return (
    <section id="contact_06">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="sub-title">
              <h2
                className="wow fadeInUp"
                data-wow-duration="2s"
                data-wow-delay=".3s"
              >
                Join us or Login
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="contact_form">
                <form onSubmit={handleRegister}>
                <div className="row">
                  <div
                    className="col-12 col-sm-12  form-group  wow fadeInUp"
                    data-wow-duration="2s"
                    data-wow-delay=".2s"
                  >
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Your username"
                    />
                  </div>
                  <div
                    className="col-12 col-sm-12  form-group  wow fadeInUp"
                    data-wow-duration="2s"
                    data-wow-delay=".3s"
                  >
                    <input
                      type="email"
                      className="form-control person-email"
                      name="email"
                      placeholder="E-mail Address"
                    />
                  </div>
                  <div
                    className="col-12 col-sm-12  form-group  wow fadeInUp"
                    data-wow-duration="2s"
                    data-wow-delay=".3s"
                  >
                    <input
                      type="password"
                      className="form-control person-email"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <div
                    className="col-12 col-sm-12  form-group  wow fadeInUp"
                    data-wow-duration="2s"
                    data-wow-delay=".3s"
                  >
                    <input
                      type="password"
                      className="form-control person-email"
                      name="password_confirmation"
                      placeholder="Confirm Password"
                    />
                    <input
                      type="text"
                      className="form-control person-email"
                      name="referrer"
                      disabled
                      value="You were invited by 0xEF7RHFE7RFYERERRE23233"
                    />
                  </div>
                  <div className="col-12 col-sm-12 form-group">
                    <div
                      className="submit-btn  wow fadeInUp"
                      data-wow-duration="2s"
                      data-wow-delay=".5s"
                    >
                      <input type="submit" value="Register" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact_form">
              <form action="#">
                <div className="row">
                  <div
                    className="col-12 col-sm-12  form-group  wow fadeInUp"
                    data-wow-duration="2s"
                    data-wow-delay=".3s"
                  >
                    <input
                      type="email"
                      className="form-control person-email"
                      id="email"
                      placeholder="E-mail Address"
                    />
                  </div>
                  <div
                    className="col-12 col-sm-12  form-group  wow fadeInUp"
                    data-wow-duration="2s"
                    data-wow-delay=".3s"
                  >
                    <input
                      type="password"
                      className="form-control person-email"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="col-12 col-sm-12 form-group">
                    <div
                      className="submit-btn  wow fadeInUp"
                      data-wow-duration="2s"
                      data-wow-delay=".5s"
                    >
                      <input type="submit" value="Login" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div id="particles11-js" className="particles" />
    </section>
  );
};

export default Login;
