const About = () => {
  return (
    <>
      <section id="welcome_cryptonic_06">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="sub-title">
                <h2
                  className="wow fadeInUp text-capitalize"
                  data-animate="fadeInUp"
                  data-delay=".1s"
                >
                  Behind the tech
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-10 col-lg-10 mx-auto">
              <div className="about_cryptonic-content">
                <img
                  src="images/welcome-6.png"
                  alt=""
                  className="wow ZoomInUp"
                  data-animate="ZoomInUp"
                  data-delay=".3s"
                />
                <p
                  className="wow fadeInUp"
                  data-animate="fadeInUp"
                  data-delay="0.3s"
                >
                  Seriena was founded on the idea that blockchain could revolutionize how the world interacts and transacts. But to get to mass adoption, chain technology and the ecosystem connecting it to the business world needed to be reimagined from the ground up. Our founders built a proprietary chain architecture and created the tools to make blockchain work for business – at speed, scale, and energy efficiency previously thought unachievable.
                </p>
                <a
                  href="https://docs.kadena.io/whitepapers/overview"
                  className="btn btn-default btn-default-style wow fadeInUp"
                  data-animate="fadeInUp"
                  data-delay="0.4s"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
        <span className="shape1 header-shape">
          <img src="images/shape/home_6/wel-map.png" alt="" />
        </span>
        <span className="bubble1 header-shape">
          <img src="images/particals_icon/fixed1.png" alt="" />
        </span>
        <span className="bubble2 header-shape">
          <img src="images/particals_icon/fixed1.png" alt="" />
        </span>
        <div id="particles2-js" className="particles" />
      </section>
    </>
  );
};

export default About;
