const Roadmap = () => {
  return (
    <section id="roadmap_06">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="sub-title">
              <h2
                className="wow fadeInUp"
                data-wow-duration="2s"
                data-wow-delay=".2s"
              >
                Floki-Doge Roadmap
              </h2>
              <p
                className="wow fadeInUp"
                data-wow-duration="2s"
                data-wow-delay=".3s"
              >
                Our team is building a proprietary chain architecture and
                creating the tools to make blockchain work for business – at
                speed, scale, and energy efficiency previously thought
                unachievable.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="location_04">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="location_wrapper">
                <div className="roadmap_position" />
                <div
                  className="location location_top location_1 wow fadeInUp"
                  data-wow-duration="2s"
                  data-wow-delay=".2s"
                >
                  <div className="map_date">
                    <h5>December, 2021</h5>
                  </div>
                  <span />
                  <div className="location_title">
                    <h3>Pre-Sale</h3>
                  
                      <ul>
                        <li>ICO/IEO.</li>
                        <li>
                          Exchange listing: Bitmart, Hotbit, Gate.io, Julswap,
                          Hoo.
                        </li>
                        <li>Buy back events on exchanges.</li>
                      </ul>
                    
                  </div>
                </div>
                <div
                  className="location location_bttom location_2 wow fadeInUp"
                  data-wow-duration="2s"
                  data-wow-delay=".3s"
                >
                  <div className="map_date">
                    <h5>February, 2022</h5>
                  </div>
                  <span />
                  <div className="location_title">
                    <h3>DeFi, NFT & Payments</h3>
                    <p>
                      Floki-Doge's unique features and flexibility will support every
                      imaginable use case: Serial and Fractional NFTs without
                      items being locked behind a single exchange.
                    </p>
                  </div>
                </div>
                <div
                  className="location location_top location_3 wow fadeInUp"
                  data-wow-duration="2s"
                  data-wow-delay=".4s"
                >
                  <div className="map_date">
                    <h5>July, 2022</h5>
                  </div>
                  <span />
                  <div className="location_title">
                    <h3>Interop & Relays</h3>
                    <p className="text-capitalize">
                      Every day, Floki-Doge builders will leverage what no other
                      blockchain has: trustless (no third-party trust needed),
                      decentralized, cross-chain transfers.
                    </p>
                  </div>
                </div>
                <div
                  className="location location_bttom location_4 wow fadeInUp"
                  data-wow-duration="2s"
                  data-wow-delay=".5s"
                >
                  <div className="map_date">
                    <h5>November, 2022</h5>
                  </div>
                  <span />
                  <div className="location_title">
                    <h3>Governance</h3>
                    <p className="text-capitalize">
                      Floki-Doge will be governed at three levels: <br /> (1) code level, <br /> (2)
                      account management level, and <br /> (3) setting strategic
                      direction for key community initiatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="shape2 header-shape">
        <img src={window.location.origin+"/images/shape/home_6/road_map_2.png"} alt />
      </span>
      <span className="shape3 header-shape">
        <img src={window.location.origin+"/images/shape/home_6/road_map_3.png"} alt />
      </span>
      <div id="particles7-js" className="particles" />
    </section>
  );
};

export default Roadmap;
