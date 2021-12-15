const Footer = () => {
    return ( 
        
      <footer id="footer-06" className="footer">
      <div className="container">
        <div className="row footer-btm-wrapper">
          <div className="col-md-12 col-lg-12">
            <div className="footer_items">
              <div className="footer-single-col footer_single_list_1">
                <h3 className="subtitle_1">
                  &nbsp;
                  <img src={window.location.origin+"/images/Seriena.png"} alt />
                </h3>
                <p>
                Seriena offers your teams the full capabilities of crypto with the tools to go from concept to launch in days instead of months.
                </p>
                <ul className="social-links list-unstyled ml-auto">
                  <li className="nav-item">
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#">
                      <i className="fab fa-telegram-plane" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-single-col footer_single_list_2">
                <h3 className="subtitle_1">Company</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                </ul>
              </div>
              <div className="footer-single-col footer_single_list_3">
                <h3 className="subtitle_1">Information</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Roadmap</a>
                  </li>
                  <li>
                    <a href="#">Partners</a>
                  </li>
                </ul>
              </div>
              <div className="footer-single-col footer_single_list_4">
                <h3 className="subtitle_1">Product</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Pre-sale</a>
                  </li>
                  <li>
                    <a href="#">Tokenomics</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>
          Copyright © 2021. Powered by <span>Seriena</span>
        </p>
      </div>
      <span className="shape1 header-shape">
        <img src={window.location.origin+"/images/shape/home_6/footer_shape_1.png"} alt />
      </span>
      <span className="shape2 header-shape">
        <img src={window.location.origin+"/images/shape/home_6/footer_shape_2.png"} alt />
      </span>
      <span className="shape3 header-shape">
        <img src={window.location.origin+"/images/shape/home_6/footer_shape_3.png"} alt />
      </span>
    </footer>
     );
}
 
export default Footer;