/**
 *  Created by pw on 2019-07-26 14:20.
 */
export function getAmount(amount) {
  if (typeof amount === 'object' && amount !== null) {
    return amount.standard || 0
  }
  return amount || 0
}

export function thousandBitSeparator(num) {
  if (num && num.toString().indexOf(',') > -1) {
    return num
  }
  const result =
    num &&
    num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function(_, $1) {
      return $1 + ','
    })
  return result
}
