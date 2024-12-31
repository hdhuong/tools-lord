import fs from "fs";
import XLSX from "xlsx";

// Function to convert Excel to CSV
function convertExcelToCSV(excelFilePath, csvFilePath) {
  // Read the Excel file
  const workbook = XLSX.readFile(excelFilePath);

  // Select the first sheet
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert the sheet to CSV
  const csvData = XLSX.utils.sheet_to_csv(sheet);

  // Write the CSV data to a file
  fs.writeFileSync(csvFilePath, csvData);
  console.log(`Successfully converted ${excelFilePath} to ${csvFilePath}`);
}

// Example usage
const excelFilePath = "../../../Downloads/bom_producing_step_details.xlsx";
const csvFilePath = "../../SMC-data/bomPsDetails0411.csv";
convertExcelToCSV(excelFilePath, csvFilePath);
