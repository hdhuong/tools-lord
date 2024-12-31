import fs from "fs";
import XLSX from "xlsx";

// Function to convert Excel to SQL
const convertExcelToJson = (inputFile, outputFile) => {
  try {
    // Read the Excel file
    const workbook = XLSX.readFile(inputFile);
    const sheetName = workbook.SheetNames[1];
    const sheet = workbook.Sheets["Data"];

    // Convert sheet to JSON
    const rows = XLSX.utils.sheet_to_json(sheet);

    console.log({ rows });

    if (rows.length === 0) {
      console.log("No data found in the Excel file.");
      return;
    }

    fs.writeFileSync(outputFile, rows, "utf8");
    console.log(`SQL file created: ${outputFile}`);
  } catch (error) {
    console.error("Error converting Excel to SQL:", error.message);
  }
};

// Input and output file paths
const inputFile = "../../../Downloads/Output_Formula_Node.xlsx"; // Replace 'input.xlsx' with your Excel file name
const outputFile = "../../SMC-data/output.json";

// Run the conversion
convertExcelToJson(inputFile, outputFile);
