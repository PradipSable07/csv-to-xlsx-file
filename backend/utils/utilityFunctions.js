// function to read data from an XLSX file by sheet name
import csv from 'csv-parser'; 
import XLSX from 'xlsx';

import fs from 'fs';

export const readXLSXSheetByName = (filePath, sheetName) => {
    const workbook = XLSX.readFile(filePath);
    if (!workbook.Sheets[sheetName]) {
      throw new Error(`Sheet with name "${sheetName}" not found.`);
    }
    const sheet = workbook.Sheets[sheetName];
    // console.log(XLSX.utils.sheet_to_json(sheet))
    return XLSX.utils.sheet_to_json(sheet);
  };


// function to read and parse CSV files
export const readCSVFile = (filePath) => {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv({
          skipLines:1
        }))
        .on('data', (row) => {

          results.push(row);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  };