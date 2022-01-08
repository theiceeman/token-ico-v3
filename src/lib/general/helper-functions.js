import { BigNumber } from "ethers";

export function capitalize(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function parseCommasPerThousand(str) {
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function formatNumber(n) {
  return String(n).replace(/(.)(?=(\d{3})+$)/g, "$1,");
  // "1,234,567,890"
}

export function toDecimal(n, decimal) {
  return BigNumber.from((n * 10 ** decimal).toString());
}
export function convertToDecimal(n, decimal) {
  return n * 10 ** decimal;
}
export function convertWithDecimal(n, decimal) {
  return n / 10 ** decimal;
}
export function convertTokenToCoin(token, crowdsale_rate) {
  // 1LINK -> 0.001 ETH
  return token * crowdsale_rate;
}

export function convertEpochToDate(date_in_secs) {
  var myDate = new Date(date_in_secs * 1000);
  return myDate.toLocaleString(); // 01/10/2020, 10:35:02
}

export function rpcErrors(err) {
  switch (err.code) {
    case -32603:
      let errMessage = err.data.message;
      let revertError = errMessage.split("reverted with reason string");
      return { error: true, message: revertError[1] };
      break;

    default:
      return { error: true, message: err.message };
      break;
  }
}
