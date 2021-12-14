const Whitepaper = () => {
  return (
    <section id="about_cryptonic_06">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-7 col-lg-5 padding-none">
            <div className="about_cryptonic-content">
              <h2
                className="wow fadeInUp"
                data-animate="fadeInUp"
                data-delay="0.2s"
              >
                Build without compromise
              </h2>
              <p
                className="wow fadeInUp"
                data-animate="fadeInUp"
                data-delay="0.3s"
              >
                Unlike other platforms, Floki-Doge is designed to power global financial systems. Our protocol continually scales to higher TPS (Transactions per Second) as more chains are added to the network.
              </p>
              <p
                className="wow fadeInUp"
                data-animate="fadeInUp"
                data-delay="0.4s"
              >
                {/* Due to the use of large computing power and artificial based on
                the neural network, the NRM assistant will instantly analyze
                user data and offer solutions for their further use. */}
              </p>
              <a
                href="https://docs.kadena.io/whitepapers/overview"
                className="btn btn-default btn-default-style wow fadeInUp"
                data-animate="fadeInUp"
                data-delay="0.5s"
              >
                Download Whitepaper
              </a>
            </div>
          </div>
          <div className="col-sm-12 col-md-5 col-lg-7">
            <div className="about-img">
              <div className="img-wrapper">
                <img
                  src="images/index-about.png"
                  alt
                  className="wow fadeInUp"
                  data-animate="fadeInUp"
                  data-delay=".3s"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="shape1 header-shape">
        <img src="images/shape/home_6/about-light-1.png" alt />
      </span>
      <span className="shape2 header-shape">
        <img src="images/shape/home_6/about-light-2.png" alt />
      </span>
      <span className="bubble1 header-shape">
        <img src="images/particals_icon/fixed1.png" alt />
      </span>
      <span className="bubble2 header-shape">
        <img src="images/particals_icon/fixed2.png" alt />
      </span>
      <span className="bubble3 header-shape">
        <img src="images/particals_icon/fixed3.png" alt />
      </span>
      <div id="particles3-js" className="particles" />
    </section>
  );
};

export default Whitepaper;
