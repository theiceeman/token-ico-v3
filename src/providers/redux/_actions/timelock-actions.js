import { crowdsale } from "../../../lib/ethers/contracts/crowdsale_methods";
import { timelock } from "../../../lib/ethers/contracts/timelock_methods";

export const TotalUserTokensLocked = async (user_address) => {
  try {
    let result = await timelock.TotalUserTokensLocked(user_address);
    console.log(result);
    if (result.error) {
      throw result.message;
    }
    return { error: false, message: result.message };
  } catch (error) {
    console.log({ error });
    return { error: true, message: error };
  }
};
