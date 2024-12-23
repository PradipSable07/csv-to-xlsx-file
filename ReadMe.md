# File Upload and Processing Application

## Overview

This repository contains a complete File Upload and Processing Application built with a modern tech stack. It includes:

1.Frontend: A React-based UI for uploading files, providing inputs, and downloading enriched results.

2.Backend: An Express.js server for processing uploaded files (XLSX and CSV), enriching data, and generating outputs (updated XLSX and PDF).

## Key Features

1. File Upload:

- Supports XLSX and CSV files.
- Validates files and user inputs before processing.

2.Data Enrichment:

- Matches and merges data from uploaded files.
- Removes unnecessary fields and adds enriched data.

3.Output Generation:

- Produces an updated Master Sheet (XLSX).
- Creates a detailed PDF report using Puppeteer.

4.Responsive UI:

- Built with React and styled using Tailwind CSS.

5.Error Handling:

- User-friendly error messages for validation and processing issues.

Tech Stack

### Frontend

- React: Core framework for building the UI.
- React Query: For data fetching and state management.
- Sonner: For toast notifications.
- Tailwind CSS: For responsive and modern styling.
- Vite: Build tool for fast development and optimized production builds.

### Backend

- Express.js: Lightweight framework for handling routes and APIs.
- Multer: Middleware for handling file uploads.
- XLSX: Library for reading and writing Excel files.
- csv-parser: Parses CSV files into JSON.
- Puppeteer: Generates PDFs from enriched data.
- dotenv: Loads environment variables.

## Project Structure

```
root/
├── frontend/
│   ├── src/
│   │   ├── apis/                  # API functions (e.g., uploadFiles.js)
│   │   ├── pages/                 # UI components (e.g., FileUpload.jsx)
│   │   ├── App.jsx                # Root component
│   │   └── main.jsx               # Entry point for React
│   ├── index.css                  # Global styles
│   └── tailwind.config.js         # Tailwind CSS configuration
│   └── package.json               # Frontend dependencies and scripts
├── backend/
│   ├── controllers/               # Business logic for file processing
│   ├── routes/                    # API routes
│   ├── utils/                     # Utility functions (e.g., PDF generation)
│   ├── uploads/                   # Uploaded and output files
│   ├── server.js                  # Main backend server
│   └── package.json               # Backend dependencies and scripts
├── README.md                      # Main repository documentation

```


### Getting Started

### Prerequisites

Ensure you have the following installed:
-Node.js (v14 or higher)
-npm or yarn

### 1. Clone the Repository

```
git clone https://github.com/your-repo/file-upload-processing-app.git
cd file-upload-processing-app
```

### 2.Setup Frontend

1.Navigate to the frontend/ directory:

```
cd frontend
```

2.Install dependencies:

```
npm install
```

3.Start the development server:

npm run dev

### 3.Setup Backend

 1.Navigate to the backend/ directory:

```
cd backend
```

2.Install dependencies:

```
npm install
```

3.Create a .env file and specify the following:

```
PORT=3000
```

4.Start the development server:

```
npm run dev
```

## Usage

### Frontend

1.Open the app in your browser at http://localhost:3000.
2.Upload an XLSX file and specify its sheet name.
3.Upload a CSV file.
4.Submit the files and download the updated Master Sheet and PDF report.

### Backend

1.Handles /api/files/upload endpoint for processing uploaded files.
2.Matches data from the files, enriches it, and generates outputs.

### API Details

```

POST /api/files/upload
```

Description: Processes uploaded XLSX and CSV files, enriches the data, and generates an updated XLSX and PDF report.

### Request:

- Form Data:

- files: Two files (XLSX and CSV).
- sheetName: Sheet name for processing the XLSX file.

### Response:

```
{
  "message": "Files processed successfully",
  "updatedSheetPath": "uploads/UpdatedMasterSheet.xlsx",
  "pdfPath": "uploads/EnrichedData.pdf"
}
```

## Scripts

## Frontend Scripts

```
- npm run dev: Starts the development server.
-npm run build: Builds the production-ready app.
```

## Backend Scripts

```
- npm run dev: Starts the server with live reload using Nodemon.
- npm start: Starts the server in production mode.
```
## Contributing

1.Fork the repository.

2.Create a new branch:

```
git checkout -b feature/your-feature-name
```

3.Commit your changes:

```
git commit -m "Add your message here"
```

4.Push to your branch:

```
git push origin feature/your-feature-name
```

5.Create a pull request.

## License

This project is licensed under the MIT License.