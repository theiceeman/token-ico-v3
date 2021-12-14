const customCountdown = ({days,hours,minutes,seconds}) => {
  // console.log({days,hours,minutes,seconds})
    return ( 
        
        <span>
        <div className="clock-countdown">
          <div
            className="site-config"
            data-date="12/11/2022 00:00:00"
            data-date-timezone={+0}
          />
          <div className="coundown-timer d-flex justify-content-center">
            <div className="single-counter d-flex flex-column">
              <h4>
                <span className="days count-time gradient-color">
                  {days}
                </span>
              </h4>
              <span className="normal">Days</span>
            </div>
            <div className="single-counter d-flex flex-column">
              <h4>
                <span className="hours count-time gradient-color">
                  {hours}
                </span>
              </h4>
              <span className="normal">Hours</span>
            </div>
            <div className="single-counter d-flex flex-column">
              <h4>
                <span className="minutes count-time gradient-color">
                  {minutes}
                </span>
              </h4>
              <span className="normal">Minutes</span>
            </div>
            <div className="single-counter d-flex flex-column">
              <h4>
                <span className="seconds count-time gradient-color">
                  {seconds}
                </span>
              </h4>
              <span className="normal">Seconds</span>
            </div>
          </div>
        </div>
        </span>
     );
}
 
export default customCountdown;