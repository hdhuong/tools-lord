const fs = require("fs");
const XLSX = require("xlsx");

// Load the Excel file
const excelFileName = "MKT-translation_JP.xlsx";
const workbook = XLSX.readFile(excelFileName);

// Assuming the first sheet contains your data
const sheetName = workbook.SheetNames[2];
const worksheet = workbook.Sheets[sheetName];

// Convert the worksheet to an array of objects
const rawData = XLSX.utils.sheet_to_json(worksheet, {
  header: ["Key", "Value"],
});

// Convert flat data to nested JSON structure
const jsonData = rawData.reduce((acc, entry) => {
  const keys = entry.Key.split(".");
  let currentLevel = acc;

  keys.forEach((key, index) => {
    if (!currentLevel[key]) {
      if (index === keys.length - 1) {
        // Last key, set the value
        currentLevel[key] = entry.Value;
      } else {
        // Create nested object
        currentLevel[key] = {};
      }
    }

    // Move to the next level
    currentLevel = currentLevel[key];
  });

  return acc;
}, {});

// Output the resulting JSON data
console.log(JSON.stringify(jsonData, null, 2));
