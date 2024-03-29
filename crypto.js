// Import CryptoJS library (make sure you include CryptoJS in your project)
const CryptoJS = require("crypto-js");

function encode(s) {
  // Convert the string to bytes using UTF-8 encoding
  const bytes = CryptoJS.enc.Utf8.parse(s);

  // Compute MD5 hash
  const md5Hash = CryptoJS.MD5(bytes);

  // Convert the MD5 hash to a hexadecimal string
  const md5String = md5Hash.toString(CryptoJS.enc.Hex);

  return md5String;
}

// Usage
const result = encode("f8d68714f0ac23d48dd189d5d3780fb158cb557e");
console.log(result);
