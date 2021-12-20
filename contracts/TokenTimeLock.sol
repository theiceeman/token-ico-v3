//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.0;
import "./LinkToken.sol";
import "hardhat/console.sol";
import "./lib/Ownable.sol";

contract TokenTimeLock is Ownable {
    /* 
        contract that locks all the bought tokens
    */

    // ERC20 basic token contract being held
    LinkToken private token;

    uint256 public releaseTime; // will be equiv. of 1 year in seconds

    uint256 public totalTokensLocked;

    // address allowed to call the lockTokens function
    address public admin;

    // mapping(beneficiary => vault_id => amount_locked, release_time, isReleased)
    mapping(address => mapping(uint256 => TokenTimeLockDetails))
        public UserTokenVault;
    // number of vaults created for user - can rep. no of time they bough token
    mapping(address => uint256) public totalUserVaults;

    mapping(address => uint256) public TotalUserTokensLocked;

    struct TokenTimeLockDetails {
        address beneficiary;
        uint256 amount_locked;
        uint256 release_time;
        string category;    //  bonus | purchase
        bool isReleased;
        bool isExists;
    }

    event TokenIsLocked(
        address indexed _beneficiary,
        uint256 indexed _amount_locked,
        uint256 _releaseTime
    );
    event TokenIsClaimed(
        address indexed _claimer,
        uint256 indexed _amount_claimed
    );

    constructor(
        LinkToken _token,
        uint256 _releaseTime,
        address _admin
    ) {
        require(
            block.timestamp + _releaseTime > block.timestamp,
            "TokenTimelock: release time should be greater than current time"
        );
        token = _token;
        releaseTime = _releaseTime;
        admin = _admin;
    }

    function _addNewVaultForUser(
        address beneficiary,
        uint256 amount_to_lock,
        uint256 _releaseTime,
        bool status,
        string memory category
    ) internal {
        uint256 vault_id = totalUserVaults[beneficiary];
        UserTokenVault[beneficiary][vault_id] = TokenTimeLockDetails(
            beneficiary,
            amount_to_lock,
            _releaseTime,
            category,
            status,
            true
        );
        ++totalUserVaults[beneficiary];
    }

    function lockUserToken(uint256 amount_to_lock, address beneficiary, string memory category)
        public
        returns (bool success)
    {
        require(
            msg.sender == admin,
            "TokenTimeLock: only admin is allowed to lock tokens!"
        );
        require(
            amount_to_lock > 0,
            "TokenTimeLock: no tokens supplied to be locked!"
        );
        uint256 _releaseTime = block.timestamp + releaseTime;

        _addNewVaultForUser(beneficiary, amount_to_lock, _releaseTime, false, category);

        totalTokensLocked += amount_to_lock;
        TotalUserTokensLocked[beneficiary] += amount_to_lock;

        emit TokenIsLocked(beneficiary, amount_to_lock, _releaseTime);
        return true;
    }

    /* 
    beneficiary, vault_id, 
    make sure vault exists by id
    make sure release time has reached
    make sure the correct address is claiming the token
    make sure token amount being claimed is greater than zero
    call transfer function on token contract
    minus amount from total locked
    minus amount from users total locked
    set users vault status as claimed
    emit event TokenIsClaimed
    return true if successfull
     */

    function claim(uint256 vault_id) public returns (bool success) {
        address claimer = msg.sender;
        uint256 amount_to_claim = UserTokenVault[claimer][vault_id]
            .amount_locked;
        require(
            UserTokenVault[claimer][vault_id].isExists,
            "TimeLock: vault does not exist!"
        );
        require(
            block.timestamp >= UserTokenVault[claimer][vault_id].release_time,
            "TimeLock: lock period is still active!"
        );
        require(
            UserTokenVault[claimer][vault_id].isReleased == false,
            "TimeLock: token has been claimed already!"
        );
        require(token.transfer(claimer, amount_to_claim));

        totalTokensLocked -= amount_to_claim;
        TotalUserTokensLocked[claimer] -= amount_to_claim;
        UserTokenVault[claimer][vault_id].isReleased = true;

        emit TokenIsClaimed(claimer, amount_to_claim);

        return true;
    }
}
