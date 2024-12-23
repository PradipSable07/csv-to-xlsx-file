# Backend for File Upload and Processing

## Overview

This backend application is designed to handle the upload and processing of XLSX and CSV files. It performs data enrichment by matching and merging data from the uploaded files and generates outputs, including an updated Master Sheet (XLSX) and a PDF report.

## Features

1.File Upload: Handles multiple file uploads (XLSX and CSV).

2.Data Parsing and Validation:

- Reads and parses XLSX files by a specified sheet name.
- Reads and processes CSV files.

3.Data Enrichment: Matches and enriches data by comparing rows from both files.

4.Output Generation:

 • Creates an updated Master Sheet (XLSX).
 • Generates a PDF report of the enriched data using Puppeteer.
 5. Error Handling: Returns meaningful error messages for invalid inputs or processing issues.

## Project Setup

Prerequisites
 • Node.js (v14 or higher)
 • npm or yarn

### Installation Steps

 1. Clone the repository:

```
git clone <https://github.com/your-repo/backend-file-upload.git>
cd backend-file-upload
```

2. Install dependencies:

```
npm install
```

3.Start the server:

 • Development mode with Nodemon:

```
npm run dev
```

 • Production mode:

```
npm start
```

## API Endpoints

1. File Upload Endpoint

```
Route: /api/files/upload
Method: POST
```
Description: Handles the upload of an XLSX and a CSV file, processes them, and returns the paths for the enriched outputs.

### Request

- Body:
  - sheetName: The name of the sheet to process in the XLSX file.
- Files:
  - files: Two files (one .xlsx and one .csv).

### Response

- Success (200 OK):

```
{
  "message": "Files processed successfully",
  "updatedSheetPath": "uploads/UpdatedMasterSheet.xlsx",
  "pdfPath": "uploads/EnrichedData.pdf"
}
```

- Error (400/500):

```
{
  "message": "Error processing files: <error details>"
}
```
Project Structure

```
backend/
├── controllers/
│   └── csv-to-xlsx.controller.js     # Main logic for processing files
├── routes/
│   └── fileRoutes.js                 # Routes for handling file uploads
├── utils/
│   ├── pdfGenerator.js               # Generates PDF reports using Puppeteer
│   ├── utilityFunctions.js           # Utility functions for reading files
├── server.js                         # Main server file
├── package.json                      # Project dependencies and scripts
├── .env                              # Environment variables (PORT, etc.)
└── uploads/                          # Directory for storing uploaded and output files
```

Key Modules and Utilities

1. csvToXlsx Controller

- Parses the XLSX and CSV files.
- Matches and enriches data by comparing specific fields.
- Generates outputs (updated XLSX and PDF).
- Cleans up temporary files after processing.

2.generatePDFWithPuppeteer Utility

- Converts enriched data into a styled HTML table.
- Generates a PDF report using Puppeteer.
- Saves the PDF to the uploads directory.

3.Utility Functions

- readXLSXSheetByName: Reads and converts a specified sheet from an XLSX file to JSON.
- readCSVFile: Reads and parses a CSV file into JSON.

### Configuration

1.Environment Variables:

Create a .env file with the following variables:

```
PORT=3000
```

2.File Uploads: Uploaded files are temporarily stored in the uploads/ directory using Multer.

Key Libraries
1.Core Frameworks:

- Express: Web framework for handling routes and middleware.
- Multer: Middleware for handling file uploads.

2.File Parsing:

- xlsx: Library for reading and writing Excel files.
- csv-parser: Parses CSV files into JSON.

3.PDF Generation:

- puppeteer: Headless browser for generating PDFs.

4.Development Tools:

- dotenv: Loads environment variables.
- nodemon: Automatically restarts the server during development.

Error Handling
1.Validation Errors:

- If the wrong file types are uploaded:

```
{ "message": "Both Master Sheet and Data files are required." }
```

- If the XLSX sheet name is missing:

```
{ "message": "Sheet with name '<sheetName>' not found." }
```

2.Processing Errors:

- Any unexpected errors during processing are logged and returned as:

```
{ "message": "Error processing files: <error details>" }
```

#### Sample Request Using cURL

```
curl -X POST http://localhost:3000/api/files/upload \
  -H "Content-Type: multipart/form-data" \
  -F "files=@path/to/masterSheet.xlsx" \
  -F "files=@path/to/data.csv" \
  -F "sheetName=Sheet1"
```

### Future Improvements

1.File Size Limits:

- Add limits to prevent oversized files.

2.Advanced Error Handling:

- Return more descriptive error codes for various failure scenarios.

3.Database Integration:

- Store uploaded files and results for future reference.

4.Authentication:

- Add user authentication for secure file processing.

### Contributing

Contributions are welcome! Please fork the repository, make your changes, and create a pull request.

### License

This project is licensed under the MIT License.
