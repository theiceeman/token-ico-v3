import React from "react";
import Countdown, { calcTimeDelta } from "react-countdown";
import CustomCountdown from "./CustomCountdown";
const Banner = ({tokenDetails}) => {
  let { totalSupply, name, symbol, decimals } = tokenDetails;
  let date =   Date.now() + 31536000;
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return "Completionist";
    } else {
      // Render a countdown
      return (
        <CustomCountdown
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          completed={completed}
        />
      );
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-6">
            <div className="intro-text">
              <h1>Build the future on {name}</h1>
              <p>
                Our ecosystem provides the security of Solana, virtually free
                gas, unparalleled throughput, and smarter contracts.
              </p>
              <div className="btn_video_wrapper">
                <a href="https://docs.kadena.io/whitepapers/overview" className="btn btn-default btn-default-style">
                  View Whitepaper
                </a>
                {/* <div className="video_wrapper">
                  <div className="video-play-btn">
                    <span>
                      <a
                        href="https://www.youtube.com/watch?v=D-6rzZC2Q8Y"
                        className="video-iframe"
                      >
                        <i className="fa fa-play" />
                        <span className="video_title">Presentation</span>
                      </a>
                    </span>
                  </div>
                </div> */}
              </div>
              <div className="countdown_time">
                <h3>Presale Ends in</h3>
                <Countdown date={date} renderer={renderer} />
                <div className="count-time_btn">
                  <a href="#" title className="gradient-color">
                    <span>Join our Pre-sale </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-12 col-lg-6 img-wrapper">
            <div className="intro-img">
              <div className="bounce_wrapper">
                <img src="images/header-06.png" alt="" />
                <div className="shape-1">
                  <div className="box bounce-1">
                    <img src="images/bounce/header1_b.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="shape1 header-shape">
        <img src="images/shape/home_6/header6_shape_1.png" alt="" />
      </span>
      <span className="shape2 header-shape">
        <img src="images/shape/home_6/header6_shape_2.png" alt="" />
      </span>
      <span className="shape3 header-shape">
        <img src="images/shape/home_6/header6_shape_3.png" alt="" />
      </span>
      <span className="shape4 header-shape">
        <img src="images/shape/home_6/header6_shape_4.png" alt="" />
      </span>
      <span className="shape5 header-shape">
        <img src="images/shape/home_6/header6_shape_5.png" alt="" />
      </span>
      <span className="shape6 header-shape">
        <img src="images/shape/home_6/header6_shape_6.png" alt="" />
      </span>
      <span className="bubble1 header-shape">
        <img src="images/particals_icon/fixed1.png" alt="" />
      </span>
      <span className="bubble2 header-shape">
        <img src="images/particals_icon/fixed1.png" alt="" />
      </span>
      <span className="bubble3 header-shape">
        <img src="images/particals_icon/fixed2.png" alt="" />
      </span>
      <span className="bubble4 header-shape">
        <img src="images/particals_icon/fixed4.png" alt="" />
      </span>
      <div id="particles1-js" className="particles" />
    </>
  );
  // }
};
// };

export default Banner;
