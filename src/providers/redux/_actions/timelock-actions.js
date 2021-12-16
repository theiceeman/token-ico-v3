import { timelock } from "../../../lib/ethers/contracts/timelock_methods";

export const validateReferrer = async (referrer) => {
    try {
        let isValid = await timelock.UserTokenVault(referrer);
        console.log(isValid)

    } catch (error) {
        console.log({error})
    }
}