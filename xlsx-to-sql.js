import fs from "fs";
import XLSX from "xlsx";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

// Function to convert Excel to SQL
const convertExcelToSQL = (inputFile, outputFile) => {
  try {
    // Read the Excel file
    const workbook = XLSX.readFile(inputFile);
    const sheetName = workbook.SheetNames[1]; // Assuming data is in the first sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const rows = XLSX.utils.sheet_to_json(sheet);

    if (rows.length === 0) {
      console.log("No data found in the Excel file.");
      return;
    }

    const moCodes = [];
    // Prepare SQL statements
    const sqlStatements = rows
      .map((row) => {
        const moCode = row["Mã CTSX"];
        const quantity = row["SL CTSX"];
        if (!moCode || !quantity) {
          console.log("Missing data in row:", row);
          return "";
        }

        const mappingMo = inputData.find((item) => item.code === moCode);

        moCodes.push(moCode);
        if (mappingMo) {
          return `UPDATE manufacturing_order_details SET actual_import_quantity= ${quantity} WHERE manufacturing_order_id = ${mappingMo.id};`;
        }
        // return `UPDATE manufacturing_orders SET status=4, good_quantity = ${quantity}, ng_quantity = 0 WHERE code = '${moCode}';`;
      })
      .filter(Boolean);

    // console.log(moCodes);

    // const logChunks = chunkArray(moCodes, 50);
    // logChunks.forEach((chunk) => {
    //   console.log(chunk);
    // });

    // fs.writeFileSync(outputFile, moCodes.join(","), "utf8");

    // Write SQL statements to output file
    fs.writeFileSync(outputFile, sqlStatements.join("\n"), "utf8");
    console.log(`SQL file created: ${outputFile}`);
  } catch (error) {
    console.error("Error converting Excel to SQL:", error.message);
  }
};

// Input and output file paths
const inputFile = "../../../Downloads/CTSX.xlsx"; // Replace 'input.xlsx' with your Excel file name
const outputFile = "../../SMC-data/output.sql";

// Run the conversion
convertExcelToSQL(inputFile, outputFile);
