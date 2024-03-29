export const encodeMD5 = (data) => {
  const bytes = CryptoJS.enc.Utf8.parse(data);

  // Compute MD5 hash
  const md5Hash = CryptoJS.MD5(bytes);

  // Convert the MD5 hash to a hexadecimal string
  const md5String = md5Hash.toString(CryptoJS.enc.Hex);

  return md5String;
};

export const encodeBase64 = (input) => {
  const jsonStr = JSON.stringify(input);
  const utf8Bytes = new TextEncoder().encode(jsonStr);
  return btoa(String.fromCharCode(...utf8Bytes));
};
