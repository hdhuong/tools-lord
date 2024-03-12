const { Client } = require("pg");
const ExcelJS = require("exceljs");

async function exportPostgreSQLSchemaToExcel(connectionConfig, excelFilePath) {
  const client = new Client(connectionConfig);

  try {
    await client.connect();

    const tables = await getTables(client);

    const workbook = new ExcelJS.Workbook();

    for (let table of tables) {
      const tableName = table.table_name;
      const schema = await getTableSchema(client, tableName);

      const worksheet = workbook.addWorksheet(tableName);
      worksheet.mergeCells("A1", "C1");
      worksheet.getCell("A1").value = `Table: ${tableName}`;
      worksheet.getCell("A1").font = { bold: true };

      worksheet.getRow(3).values = [
        "STT",
        "Column Name",
        "Data Type",
        "Primary Key",
        "Not Null",
        "Foreign Key",
      ];

      worksheet.getRow(3).eachCell({ includeEmpty: false }, (cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "00FFFF" },
        };
        cell.font = { bold: true };
      });

      worksheet.columns = [
        { key: "STT", width: 10 },
        { key: "Column Name", width: 30 },
        { key: "Data Type", width: 20 },
        { key: "Primary Key", width: 15 },
        { key: "Not Null", width: 15 },
        { key: "Foreign Key", width: 30 },
      ];

      schema.forEach((data) => {
        worksheet.addRow(data);
      });

      worksheet.eachRow({ includeEmpty: false }, (row) => {
        row.eachCell({ includeEmpty: false }, (cell) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });
    }

    await workbook.xlsx.writeFile(excelFilePath);
    console.log("Export completed successfully.");
  } catch (error) {
    console.error("Error exporting PostgreSQL schema:", error);
  } finally {
    await client.end();
  }
}

async function getTables(client) {
  const query = `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
  `;
  const result = await client.query(query);
  return result.rows;
}

async function getTableSchema(client, tableName) {
  const query = `
    SELECT column_name,
           data_type,
           column_default,
           is_nullable,
           ordinal_position
    FROM information_schema.columns
    WHERE table_name = $1
    ORDER BY ordinal_position;
  `;
  const result = await client.query(query, [tableName]);
  return result.rows.map((row, index) => ({
    STT: index + 1,
    "Column Name": row.column_name,
    "Data Type": row.data_type,
    "Primary Key": row.column_name === "id" ? "X" : "",
    "Not Null": row.is_nullable === "NO" ? "X" : "",
    "Foreign Key": "",
  }));
}

const connectionConfig = {
  user: "postgres",
  host: "localhost",
  database: "smc_item",
  password: "snp@123456",
  port: 5535,
};
const excelFilePath = "output3.xlsx";

exportPostgreSQLSchemaToExcel(connectionConfig, excelFilePath);
