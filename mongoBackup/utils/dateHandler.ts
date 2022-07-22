export const getDatePath = (date: Date, prefix: string, dateFormate: string) => {
  var dir = moment(date).format(dateFormate);
  return prefix + dir;
};
