export default (str, replacement) => (
  str.replace(/<i>.*<\/i>/, replacement)
);
