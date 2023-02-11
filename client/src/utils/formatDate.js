const formatDate = (date) => {
  let newDate = new Date(date)
  return (
    newDate.getDate() + '-' + newDate.getDay() + '-' + newDate.getFullYear()
  )
}
export default formatDate
