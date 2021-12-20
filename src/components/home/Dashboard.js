import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../../lib/general/helper-functions";
import { TotalUserTokensLocked } from "../../providers/redux/_actions/timelock-actions";
import { fetchUserData } from "../../providers/redux/_actions/user-actions";

const Dashboard = ({ userAccount, tokenDetails }) => {
  const dispatch = useDispatch();
  const [TotalLocked, setTotalLocked] = useState(null);

  const { data } = useSelector((state) => state.FetchUserData);
  const [userData, setUserData] = useState({});
  console.log(userData)

  useEffect(() => {
    data && setUserData(data);
  }, [data]);

 /*  useEffect(async () => {
    let result = await TotalUserTokensLocked(userAccount);
    console.log(result.message);
    setTotalLocked(result.message);
  }, [userAccount]); */

  useEffect(() => {
    dispatch(fetchUserData(userAccount));
  }, []);
  return (
    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">
          Account Overview
        </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="row">
          <div className="col-lg-6">
            {'{'}/* <div className="token-statistics card card-token height-auto roadmap-box"> */{'}'}
              <div className="card-innr mb-10">
                <button type="button" className="btn btn-secondary btn-head" data-dismiss="modal">
                  Purchase Token
                </button>
                <button type="button" className="btn btn-primary ml-10 btn-head">
                  Claim Airdrop
                </button>
              </div>
              {'{'}/* </div> */{'}'}
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
                      {'{'}formatNumber(TotalLocked){'}'}{'{'}" "{'}'}
                      <span>{'{'}tokenDetails.symbol{'}'}</span>
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
                    <h6 className="card-sub-title">Referral Balance</h6>
                    <span className="lead">
                      150,096,000 <span>{'{'}tokenDetails.symbol{'}'}</span>
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
                      <h4 className="card-title">Transaction</h4>
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">{'{'}tokenDetails.symbol{'}'} Token</th>
                          <th scope="col">Amount(BNB)</th>
                          <th scope="col">Date</th>
                          <th scope="col">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                          <td>
                            <span className="
                      tnx-type-md
                      badge badge-outline badge-success badge-md
                    ">
                              Purchase
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                          <td>
                            <span className="
                      tnx-type-md
                      badge badge-outline badge-warning badge-md
                    ">
                              Bonus
                            </span>
                          </td>
                        </tr>
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
                        <input type="text" className="copy-address" defaultValue="https://www.pomicoin.com/app/invite?ref=UD01303" disabled />
                        <button className="copy-trigger copy-clipboard" data-clipboard-text="https://www.pomicoin.com/app/invite?ref=UD01303">
                          <em className="ti ti-files" />
                        </button>
                      </div>
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">{'{'}tokenDetails.symbol{'}'} Token</th>
                          <th scope="col">Amount(BNB)</th>
                          <th scope="col">Date</th>
                          <th scope="col">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                          <td>
                            <span className="
                      tnx-type-md
                      badge badge-outline badge-success badge-md
                    ">
                              Purchase
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                          <td>
                            <span className="
                      tnx-type-md
                      badge badge-outline badge-warning badge-md
                    ">
                              Bonus
                            </span>
                          </td>
                        </tr>
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
        <button type="button" className="btn btn-secondary" data-dismiss="modal">
          Close
        </button>
        <button type="button" className="btn btn-primary">
          Save changes
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default Dashboard;
