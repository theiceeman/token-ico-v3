import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  convertEpochToDate,
  convertTokenToCoin,
  convertWithDecimal,
  formatNumber,
} from "../../lib/general/helper-functions";
import {
  SimpleToastError,
  SimpleToastSuccess,
} from "../../lib/validation/handlers/error-handlers";
import { claimAirdrop } from "../../providers/redux/_actions/crowdsale-actions";
import { claimLockedToken } from "../../providers/redux/_actions/timelock-actions";
import { fetchUserData } from "../../providers/redux/_actions/user-actions";

const Dashboard = ({ userAccount, tokenDetails, crowdsaleDetails }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.FetchUserData);
  const [userData, setUserData] = useState({});
  const [vaults, setVaults] = useState([]);
  console.log(vaults);
  const [referrals, setReferrals] = useState([]);

  const { data: airdrop } = useSelector((state) => state.claimAirdrop);

  const { data: claim_token } = useSelector((state) => state.claimLockedToken);
  console.log(claim_token);

  const purchaseToken = (e) => {
    e.preventDefault();
    $(".close").click();
    window.location.href = process.env.REACT_APP_CLIENT_URL + "#token_sale_06";
  };
  const claim_airdrop = (e) => {
    e.preventDefault();
    dispatch(claimAirdrop());
  };
  const claim_locked_token = (e) => {
    e.preventDefault();
    let vault_id = e.target.getAttribute("vault_id")
    dispatch(claimLockedToken(vault_id));
  };

  useEffect(() => {
    if (claim_token?.error === true) {
      SimpleToastError(claim_token.message);
    } else if (claim_token?.error === false) {
      SimpleToastSuccess(claim_token.message);
      dispatch(fetchUserData(userAccount));
    }
  }, [claim_token]);

  useEffect(() => {
    if (airdrop?.error === true) {
      SimpleToastError(airdrop.message);
    } else if (airdrop?.error === false) {
      SimpleToastSuccess(airdrop.message);
      dispatch(fetchUserData(userAccount));
    }
  }, [airdrop]);

  useEffect(() => {
    data && setUserData(data);
    data && setVaults(data?.vaults);
    data && setReferrals(data?.referrals);
  }, [data]);

  useEffect(() => {
    dispatch(fetchUserData(userAccount));
  }, [userAccount]);
  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Account Overview
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-12">
                <div className="card-innr mb-10">
                  <a
                    onClick={purchaseToken}
                    className="btn btn-secondary btn-head p-auto"
                  >
                    Purchase Token
                  </a>
                  {!userData.airdrop_is_claimed && (
                    <button
                      type="button"
                      onClick={claim_airdrop}
                      className="btn btn-primary ml-10 btn-head p-auto"
                    >
                      Claim Airdrop
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="token-statistics card card-token height-auto roadmap-box">
                  <div className="card-innr">
                    <div className="token-balance token-balance-with-icon">
                      <div className="token-balance-text">
                        <h6 className="card-sub-title">Wallet Balance</h6>
                        <span className="lead">
                          {formatNumber(userData.purchase_balance)}&nbsp;
                          <span>{tokenDetails.symbol}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="token-statistics card card-token height-auto roadmap-box">
                  <div className="card-innr">
                    <div className="token-balance token-balance-with-icon">
                      <div className="token-balance-text">
                        <h6 className="card-sub-title">Bonus Balance</h6>
                        <span className="lead">
                          {formatNumber(userData.bonus_balance)}&nbsp;
                          <span>{tokenDetails.symbol}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-10">
              <div className="col-lg-12">
                <div className="token-statistics card card-token height-auto roadmap-box">
                  <div className="card-innr">
                    <div className="token-balance token-balance-with-icon">
                      <div className="token-balance-text table-responsive">
                        <div className="card-head has-aside">
                          <h4 className="card-title">Transactions</h4>
                        </div>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">{tokenDetails.symbol} Token</th>
                              <th scope="col">Amount(BNB)</th>
                              <th scope="col">Release Date</th>
                              <th colSpan={2} scope="col">
                                Type
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {vaults?.map((vault, index) => (
                              <tr key={index}>
                                <th scope="row">
                                  {function(){
                                    return index + 1;
                                  }()}
                                </th>
                                <td>
                                  {formatNumber(vault.amount_locked.toString())}
                                </td>
                                <td>
                                  {formatNumber(
                                    convertTokenToCoin(
                                      vault.amount_locked.toString(),
                                      convertWithDecimal(
                                        crowdsaleDetails.tokenPrice,
                                        tokenDetails.decimals
                                      )
                                    )
                                  )}
                                </td>
                                <td>
                                  {convertEpochToDate(
                                    vault.release_time.toString()
                                  )}
                                </td>
                                <td>
                                  {vault.category == "purchase" && (
                                    <span
                                      className="
                      tnx-type-md
                      badge badge-outline badge-success badge-md
                    "
                                    >
                                      Purchase
                                    </span>
                                  )}
                                  {vault.category == "bonus" && (
                                    <span
                                      className="
                      tnx-type-md
                      badge badge-outline badge-warning badge-md
                    "
                                    >
                                      Bonus
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    vault_id={index}
                                    onClick={claim_locked_token}
                                    className="btn btn-success"
                                    data-dismiss="modal"
                                  >
                                    Claim
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-10">
              <div className="col-lg-12">
                <div className="token-statistics card card-token height-auto roadmap-box">
                  <div className="card-innr">
                    <div className="token-balance token-balance-with-icon">
                      <div className="token-balance-text table-responsive">
                        <div className="card-head has-aside">
                          <h4 className="card-title">Referrals</h4>
                        </div>
                        <div className="card-head has-aside copy-head mb-10">
                          <h4 className="card-title">Referral link: </h4>
                          <div className="copy-wrap mgb-0-5x">
                            <span className="copy-feedback" />
                            <input
                              type="text"
                              className="copy-address"
                              value={
                                process.env.REACT_APP_CLIENT_URL +
                                "invite/" +
                                userAccount
                              }
                              disabled
                            />
                          </div>
                        </div>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Address</th>
                              <th scope="col">
                                Amount ({tokenDetails.symbol})
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {referrals?.map((e, index) => (
                              <tr key={index}>
                                <th scope="row">{++index}</th>
                                <td>{e.referral_address}</td>
                                <td>{e.amount.toString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
