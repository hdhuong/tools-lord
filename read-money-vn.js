const readGroup = (group) => {
  const readDigit = [
    " Không",
    " Một",
    " Hai",
    " Ba",
    " Bốn",
    " Năm",
    " Sáu",
    " Bảy",
    " Tám",
    " Chín",
  ];
  let temp = "";
  if (group === "000") return "";
  temp = readDigit[parseInt(group.substring(0, 1))] + " Trăm";
  if (group.substring(1, 2) === "0") {
    if (group.substring(2, 3) === "0") return temp;
    else {
      temp += " Lẻ" + readDigit[parseInt(group.substring(2, 3))];
      return temp;
    }
  } else {
    temp += readDigit[parseInt(group.substring(1, 2))] + " Mươi";
  }
  if (group.substring(2, 3) === "5") temp += " Lăm";
  else if (group.substring(2, 3) !== "0")
    temp += readDigit[parseInt(group.substring(2, 3))];
  return temp;
};

const readDecimalPart = (decimalPart) => {
  if (!decimalPart) return "";

  const readDigit = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];

  let result = "";
  for (const digit of decimalPart) {
    result += readDigit[parseInt(digit)] + " ";
  }

  return result.trim();
};

export const readMoney = (num, currencyUnit) => {
  const unitString = "USD";

  if (!num) return "";
  let temp = "";
  const numStr = num.toString().split(".");
  let integerPart = numStr[0];
  const decimalPart = numStr[1] || "";

  while (integerPart.length < 18) {
    integerPart = "0" + integerPart;
  }

  const g1 = integerPart.substring(0, 3);
  const g2 = integerPart.substring(3, 6);
  const g3 = integerPart.substring(6, 9);
  const g4 = integerPart.substring(9, 12);
  const g5 = integerPart.substring(12, 15);
  const g6 = integerPart.substring(15, 18);

  if (g1 !== "000") {
    temp = readGroup(g1);
    temp += " Triệu";
  }
  if (g2 !== "000") {
    temp += readGroup(g2);
    temp += " Nghìn";
  }
  if (g3 !== "000") {
    temp += readGroup(g3);
    temp += " Tỷ";
  } else if (temp !== "") {
    temp += " Tỷ";
  }
  if (g4 !== "000") {
    temp += readGroup(g4);
    temp += " Triệu";
  }
  if (g5 !== "000") {
    temp += readGroup(g5);
    temp += " Nghìn";
  }

  temp += readGroup(g6);

  temp = temp.replace(/Một Mươi/g, "Mười");
  temp = temp.trim();
  temp = temp.replace(/Không Trăm/g, "");
  temp = temp.trim();
  temp = temp.replace(/Mười Không/g, "Mười");
  temp = temp.trim();
  temp = temp.replace(/Mươi Không/g, "Mươi");
  temp = temp.trim();
  if (temp.indexOf("Lẻ") === 0) temp = temp.substring(2);
  temp = temp.trim();
  temp = temp.replace(/Mươi Một/g, "Mươi Mốt");
  temp = temp.trim();

  let result =
    temp.substring(0, 1).toUpperCase() + temp.substring(1).toLowerCase();

  if (decimalPart) {
    result += " phẩy " + readDecimalPart(decimalPart);
  }

  return (result === "" ? "Không" : result) + ` ${unitString}`;
};
