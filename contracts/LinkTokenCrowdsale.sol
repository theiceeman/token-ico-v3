//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.0;
import "./LinkToken.sol";
import "./TokenTimeLock.sol";

contract LinkTokenCrowdsale {
    address admin;

    // token configs.
    LinkToken public token;
    TokenTimeLock public tokenTimeLock;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    // user referrals
    uint256 public referrer_percentage;
    mapping(address => mapping(uint256 => UserReferralDetails))
        public UserReferrals;
    mapping(address => uint256) public TotalReferralsForUser;

    // user airdrops
    uint256 public totalTokensForAirdrop;
    uint256 public amtClaimedPerAirdrop;
    mapping(address => bool) public whiteListedAddressForAirdrop;
    uint256 public totalTokensAirdropped;

    struct UserReferralDetails {
        address referral_address;
        uint256 amount;
    }

    constructor(
        LinkToken _token,
        uint256 _tokenPrice,
        uint256 _referrer_percentage,
        uint256 _totalTokensForAirdrop,
        uint256 _amtClaimedPerAirdrop
    ) {
        admin = msg.sender;
        token = _token;
        tokenPrice = _tokenPrice;
        referrer_percentage = _referrer_percentage;
        totalTokensForAirdrop = _totalTokensForAirdrop;
        amtClaimedPerAirdrop = _amtClaimedPerAirdrop;
    }

    event Sell(address _buyer, uint256 _numberOfTokens);

    function _setUserReferrals(
        address referrer,
        address referral,
        uint256 amount
    ) internal returns (bool success) {
        uint256 id = TotalReferralsForUser[referrer];
        UserReferrals[referrer][id] = UserReferralDetails(referral, amount);
        ++TotalReferralsForUser[referrer];
        return true;
    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function setTimeLock(TokenTimeLock _tokenTimeLock) public {
        tokenTimeLock = _tokenTimeLock;
    }

    function setWhiteListedAddressForAirdrop(address userToWhiteList) public {
        whiteListedAddressForAirdrop[userToWhiteList] = true;
    }

    function buyTokens(uint256 _numberOfTokens, address referrer)
        public
        payable
    {
        require(
            msg.value == multiply(_numberOfTokens, tokenPrice),
            "Crowdsale: msg.value must equal number of tokens in wei!"
        );
        require(
            token.balanceOf(address(this)) >= _numberOfTokens,
            "Crowdsale: You can't buy more tokens than available!"
        );
        require(token.transfer(address(tokenTimeLock), _numberOfTokens));

        require(tokenTimeLock.lockUserToken(_numberOfTokens, msg.sender));
        tokensSold += _numberOfTokens;

        if (referrer != address(0) && referrer != msg.sender) {
            require(
                rewardReferrer(referrer, _numberOfTokens, msg.sender),
                "Crowdsale: unable to reward referrer!"
            );
        }

        emit Sell(msg.sender, _numberOfTokens);
    }

    function rewardReferrer(
        address referrer,
        uint256 amount_purchased,
        address referral
    ) internal returns (bool success) {
        uint256 referrers_reward = (amount_purchased / 100) *
            referrer_percentage;
        require(token.transfer(address(tokenTimeLock), referrers_reward));
        require(tokenTimeLock.lockUserToken(referrers_reward, referrer));
        tokensSold += referrers_reward;
        require(_setUserReferrals(referrer, referral, amount_purchased));
        return true;
    }

    /* 
    referrer, amount_deposited
    get referral percentage
    calculate referrer's reward
    transfer referrers_reward to timelock address
    lockup referrers_reward to be claimed
    uodate tokenSold with referrers_award
    update referrer mapping
    update TotalUserReferrals

     */

    /* 
        -> totalTokensForAirdrop, whiteListedAddressForAirdrop[], totalAirdropped

        function(user_address)
        make sure user can claim only once
        make sure airdrop amount is set
        make sure totalAirdropped is not more than totalTokensForAirdrop
        transfer token to user
        whitelist user's address
        update totalTokensAirdropped
        uodate tokenSold with airdropped amount        

     */

    function claimAirdrop() public returns (bool success) {
        require(
            !whiteListedAddressForAirdrop[msg.sender],
            "Airdrop: you've recieved airdrop previously!"
        );
        require(
            totalTokensForAirdrop != 0,
            "Airdrop: tokens for airdrop have not been located!"
        );
        require(
            amtClaimedPerAirdrop != 0,
            "Airdrop: amount to be claimed is not set!"
        );
        require(
            totalTokensAirdropped + amtClaimedPerAirdrop <= totalTokensForAirdrop,
            "Airdrop: airdrop has ended!"
        );
        require(token.transfer(address(tokenTimeLock), amtClaimedPerAirdrop));
        require(tokenTimeLock.lockUserToken(amtClaimedPerAirdrop, msg.sender));
        setWhiteListedAddressForAirdrop(msg.sender);
        totalTokensAirdropped += amtClaimedPerAirdrop;
        tokensSold += amtClaimedPerAirdrop;

        return true;
    }

    function endSale() public {
        require(
            msg.sender == admin,
            "Crowdsale: only admin can end crowdsale!"
        );
        require(token.transfer(admin, token.balanceOf(address(this))));

        // payable(admin).transfer(address(this).balance);

        (bool sent, ) = payable(admin).call{value: address(this).balance}("");
        require(sent, "Crowdsale: Failed to send ether!");
    }
}
