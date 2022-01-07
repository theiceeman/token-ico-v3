const { BigNumber } = require("ethers");


function toDecimal(n, decimal) {
  return BigNumber.from((n * 10 ** decimal).toString());
}

module.exports  = {
    toDecimal
}