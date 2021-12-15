import { useDispatch } from "react-redux";
import { connectToUserWallet } from "../providers/redux/_actions/user-actions";

const Navbar = ({userAccount}) => {
  const dispatch = useDispatch();

  const connectWallet = (e) => {
    e.preventDefault();
    dispatch(connectToUserWallet());
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-faded cripto_nav">
      <div className="container">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars" />
        </button>
        <a className="navbar-brand" data-scroll href="index.html">
          <img src={window.location.origin+"/images/Seriena.png"} alt="logo" />
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a data-scroll href="#header-06" className="nav-link active">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a data-scroll href="#welcome_cryptonic_06" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item">
              <a data-scroll href="#token_sale_06" className="nav-link">
                Pre-sale
              </a>
            </li>
            <li className="nav-item">
              <a data-scroll href="#token_distribution_06" className="nav-link">
                Tokenomics
              </a>
            </li>
            <li className="nav-item">
              <a data-scroll href="#roadmap_06" className="nav-link">
                Roadmap
              </a>
            </li>
            <li className="nav-item">
              <a data-scroll href="#companis_supported_06" className="nav-link">
                Partners
              </a>
            </li>
          </ul>
        </div>
        <div className="language">
          <button onClick={connectWallet} className="token">
            Connect wallet
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
