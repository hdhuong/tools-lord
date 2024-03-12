const { MongoClient, ObjectId } = require("mongodb");
const ExcelJS = require("exceljs");

async function getCollectionSchema(db, collectionName) {
  const collection = db.collection(collectionName);
  const sampleDocument = await collection.findOne();

  if (!sampleDocument) {
    console.error(`No documents found in collection ${collectionName}`);
    return [];
  }

  const fields = Object.keys(sampleDocument);
  const schema = fields.map((field, index) => {
    const dataType = getType(sampleDocument[field]);
    const isUnique = field === "_id";
    return {
      STT: index + 1,
      Field: field,
      "Data Type": dataType,
      "Unique ?": isUnique ? "X" : "",
      "Required ?": "",
      "Primary Key": "",
      "Is Array": Array.isArray(sampleDocument[field]) ? "X" : "",
      Note: "",
      Description: "",
      "Foreign Key": "",
    };
  });

  return schema;
}

function getType(value) {
  if (Array.isArray(value)) {
    return "Array";
  } else if (value instanceof Date) {
    return "Date";
  } else if (value instanceof ObjectId) {
    return "ObjectId";
  } else {
    return typeof value;
  }
}

async function exportMongoDBSchemaToExcel(uri, dbName, excelFilePath) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collections = await database.listCollections().toArray();

    const workbook = new ExcelJS.Workbook();

    for (let collection of collections) {
      const collectionName = collection.name;
      const schema = await getCollectionSchema(database, collectionName);

      const worksheet = workbook.addWorksheet(collectionName);
      worksheet.mergeCells("A1", "C1");
      worksheet.getCell("A1").value = `Collection: ${collectionName}`;
      worksheet.getCell("A1").font = { bold: true };

      worksheet.getRow(3).values = [
        "STT",
        "Field",
        "Data Type",
        "Unique ?",
        "Required ?",
        "Primary Key",
        "Is Array",
        "Note",
        "Description",
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
        { key: "Field", width: 30 },
        { key: "Data Type", width: 20 },
        { key: "Unique ?", width: 15 },
        { key: "Required ?", width: 15 },
        { key: "Primary Key", width: 15 },
        { key: "Is Array", width: 15 },
        { key: "Note", width: 30 },
        { key: "Description", width: 30 },
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
    console.error("Error exporting MongoDB schema:", error);
  } finally {
    await client.close();
  }
}

const mongoURI = "mongodb://admin:snp123456@localhost:6968/?authSource=admin";
const databaseName = "invoices";
const excelFilePath = "output.xlsx";

exportMongoDBSchemaToExcel(mongoURI, databaseName, excelFilePath);
