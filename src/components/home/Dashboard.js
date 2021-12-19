const Dashboard = () => {
  return (
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Account Overview
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div className="row">
              <div className="col-lg-6">
                {/* <div className="token-statistics card card-token height-auto roadmap-box"> */}
                  <div className="card-innr mb-10">
                    <button
                      type="button"
                      class="btn btn-secondary btn-head"
                      data-dismiss="modal"
                    >
                      Purchase Token
                    </button>
                    <button type="button" class="btn btn-primary ml-10 btn-head">
                      Claim Airdrop
                    </button>
                  </div>
                {/* </div> */}
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
                          120,000,000 <span>TWZ</span>
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
                          150,096,000 <span>TWZ</span>
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
                        <div class="card-head has-aside">
                          <h4 class="card-title">Transaction</h4>
                        </div>
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">LINK Token</th>
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
                                <span
                                  class="
                            tnx-type-md
                            badge badge-outline badge-success badge-md
                          "
                                >
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
                                <span
                                  class="
                            tnx-type-md
                            badge badge-outline badge-warning badge-md
                          "
                                >
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
                        <div class="card-head has-aside">
                          <h4 class="card-title">Referrals</h4>
                        </div>
                        <div class="card-head has-aside copy-head mb-10">
                          <h4 class="card-title">Referral link: </h4>
                          <div class="copy-wrap mgb-0-5x">
                            <span class="copy-feedback"></span>
                            <input
                              type="text"
                              class="copy-address"
                              value="https://www.pomicoin.com/app/invite?ref=UD01303"
                              disabled
                            />
                            <button
                              class="copy-trigger copy-clipboard"
                              data-clipboard-text="https://www.pomicoin.com/app/invite?ref=UD01303"
                            >
                              <em class="ti ti-files"></em>
                            </button>
                          </div>
                        </div>
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">LINK Token</th>
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
                                <span
                                  class="
                            tnx-type-md
                            badge badge-outline badge-success badge-md
                          "
                                >
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
                                <span
                                  class="
                            tnx-type-md
                            badge badge-outline badge-warning badge-md
                          "
                                >
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
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
