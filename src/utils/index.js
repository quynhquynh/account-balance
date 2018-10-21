export const generateDate = () => {
  const [day, month, year] = [
    new Date().getDate(),
    new Date().getMonth() + 1,
    new Date().getFullYear()
  ];
  const date = `${day}/${month}/${year}`;
  return date;
};

export const generateTime = () => {
  const timeStr = new Date().toTimeString();
  const spaceIndex = timeStr.indexOf(" ");
  const time = timeStr.substr(0, spaceIndex - 3);
  return time;
};
