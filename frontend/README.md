# Frontend File Upload Application

### Overview

This is a React-based application designed for uploading and processing XLSX and CSV files. The application allows users to:

- Upload an XLSX file and specify its sheet name.

- Upload a CSV file.

- Send the uploaded files to the server for processing.

- Download the processed results as an updated Master Sheet (XLSX) and a PDF report.

The project leverages modern tools and libraries such as React, React Query, Sonner for notifications, and Tailwind CSS for styling.

### Features

1.File Upload: Allows users to upload one XLSX file and one CSV file.

2.Sheet Name Input: Users can specify the sheet name for the XLSX file.

3.File Validation: Ensures that both file types are uploaded before submission.

4.File Processing:
 -Sends files to the backend for processing.
 -Receives and displays enriched data, and provides download links for the updated Master Sheet and PDF.

5.Error Handling:
 -Displays user-friendly error messages if file uploads or processing fails.

6.Responsive Design: Fully responsive design using Tailwind CSS.

### Project Setup

Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn

Installation Steps

1.Clone the repository:

```
git clone https://github.com/your-repo/frontend-upload-app.git
cd frontend-upload-app
```

2.Install dependencies:

```
npm install
```

 3. Start the development server:

```
npm run dev
```

 4. Open the app in your browser:

```
<http://localhost:3000>
```

### Usage

Uploading Files:

1. XLSX File:

- Click on the upload area for the XLSX file.
- Select an .xlsx file from your system.

2. CSV File:

- Click on the upload area for the CSV file.
- Select a .csv file from your system.

3. Enter Sheet Name:

- Provide the sheet name for the XLSX file.

### Submit

Click the Upload Files button to submit the files. The app will:

- Validate the inputs.
- Send the files to the backend for processing.

Download Processed Files

- Once the files are processed, download links for the updated Master Sheet and PDF report will appear.

Project Structure

```
frontend/
├── public/               # Static assets
├── src/
│   ├── apis/             # API functions (uploadFiles.js)
│   ├── pages/            # Components (FileUpload.jsx)
│   ├── App.jsx           # Root component
│   ├── index.css         # Global styles
│   └── main.jsx          # App entry point
├── package.json          # Project configuration and dependencies
└── tailwind.config.js    # Tailwind CSS configuration
```

Key Libraries

 1. React: Core library for building the UI.
 2. @tanstack/react-query: For data fetching and state management.
 3. Sonner: For toast notifications.
 4. Tailwind CSS: For styling.
 5. React Icons: For file type icons.

Technical Details

Core Files

1. FileUpload Component (src/pages/FileUpload.jsx)

Handles:
 • File selection and preview.
 • Validation and error handling.
 • Submission of files to the server.
 • Display of download links for processed files.

2.Upload API (src/apis/uploadFiles.js)

Sends the selected files and sheet name to the backend for processing using a POST request:

const response = await fetch('<http://localhost:3000/api/files/upload>', {
  method: 'POST',
  body: formData,
});

Backend Endpoint
 • POST /api/files/upload
 • Request Body: FormData with the files and sheet name.

## Scripts

### Development

```

npm run dev
```

### Build

```
npm run build
```

### Lint

```
npm run lint
```
## Future Improvements

1.File Validation:

- Add size and format validation for better user feedback.

2.Progress Indicator:

- Show upload progress for larger files.

3.Multi-language Support:

- Add i18n for a broader audience.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for major changes.

## License

This project is licensed under the MIT License.