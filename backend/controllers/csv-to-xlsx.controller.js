import fs from 'fs';
import XLSX from 'xlsx';
import path from 'path';
import { readCSVFile, readXLSXSheetByName } from '../utils/utilityFunctions.js';
import { generatePDFWithPuppeteer } from '../utils/pdfGenerator.js';

export const csvToXlsx = async (req, res) => {
    const files = req.files;
    const {sheetName} = req.body;
    // Ensure exactly two files are uploaded
    if (files.length !== 2) {
      return res.status(400).json({ message: 'Please upload exactly two files: Master Sheet and Data.' });
    }
  
    // Find the Master Sheet and Data files based on name
    const masterSheetFile = files.find(file => file.originalname.endsWith('.xlsx'));
    const dataFile = files.find(file => file.originalname.endsWith('.csv'));
  
    if (!masterSheetFile || !dataFile) {
      return res.status(400).json({ message: 'Both Master Sheet and Data files are required.' });
    }
  
    try {
      // Read Master Sheet (XLSX file)
      let masterSheetData;
      if (masterSheetFile.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || masterSheetFile.originalname.endsWith('.xlsx')) {
        masterSheetData = readXLSXSheetByName(masterSheetFile.path, sheetName); // Adjust sheet name
        // console.log(masterSheetData)
      } else {
        return res.status(400).json({ message: 'Master Sheet file must be an XLSX file.' });
      }
  
      // Read Data file (CSV file)
      let dataCSV;
      if (dataFile.mimetype === 'text/csv' || dataFile.originalname.endsWith('.csv')) {
        dataCSV = await readCSVFile(dataFile.path);
        // console.log(dataCSV);
      } else {
        return res.status(400).json({ message: 'Data file must be a CSV file.' });
      }
  
      
      const dataMap = new Map();
      dataCSV.forEach(row => {
        const key = `${row['Model']},${row['Type Mark']}}`;
        dataMap.set(key, row);
      });
  
      // Match and enrich Master Sheet rows using the hash map
      const enrichedData = masterSheetData
        .map(row => {
          const key = `${row['Facade Type']},${row['Sub Type']}}`;
          const match = dataMap.get(key);
          // console.log(match)
          if (match) {
            const enrichedRow = {
              ...row,
              'Glass (Sqm)': match['Area'], // Move Area value to "Glass (Sqm)" column
              
            };
  
            // Remove the Area field
            delete enrichedRow['Area'];
  
            return enrichedRow;
          }
        })
  
        .filter(row => row !== undefined);
  console.log(enrichedData)
        
  
  
      // Write the updated Master Sheet with enriched data
      const updatedMasterSheetPath = path.join('uploads', 'UpdatedMasterSheet.xlsx');
      const workbook = XLSX.utils.book_new();
      const originalSheet = XLSX.utils.json_to_sheet(masterSheetData);
      const enrichedSheet = XLSX.utils.json_to_sheet(enrichedData);
  
      XLSX.utils.book_append_sheet(workbook, originalSheet, 'Original Data');
      XLSX.utils.book_append_sheet(workbook, enrichedSheet, 'Enriched Data');
  
      XLSX.writeFile(workbook, updatedMasterSheetPath);
  
      // Generate PDF using the separated function
      const pdfPath = path.join('uploads', 'EnrichedData.pdf');
      const newPdfPath = await generatePDFWithPuppeteer(enrichedData, pdfPath);
  
      // Clean up uploaded files
      fs.unlinkSync(masterSheetFile.path);
      fs.unlinkSync(dataFile.path);
  console.log(newPdfPath);
      // Return the path to the updated Master Sheet
      res.json({
        message: 'Files processed successfully',
        // matchedData: enrichedData,
        updatedSheetPath: updatedMasterSheetPath,
        pdfPath: pdfPath,
      });
    } catch (error) {
      res.status(500).json({ message: `Error processing files: ${error.message}` });
    }
  }