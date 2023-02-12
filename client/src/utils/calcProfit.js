const calcProfit = (initial, current) => {
  return Math.floor((((current - initial) * 100) / initial) * 100) / 100
}
export default calcProfit
