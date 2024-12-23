import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

/**
 * Generates a PDF from the enriched data using Puppeteer.
 * @param {Array} enrichedData - Array of enriched data objects.
 * @param {String} outputPath - Path to save the generated PDF.
 * @returns {Promise<String>} - The path to the generated PDF.
 */
export const generatePDFWithPuppeteer = async (enrichedData, outputPath) => {
  try {
    const finalHtml = generateHtmlTemplate(enrichedData);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
    });

    const page = await browser.newPage();

    // Load the HTML content
    await page.setContent(finalHtml, { waitUntil: 'load' });

    // Configure PDF options
    const pdfOptions = {
      path: outputPath,
      format: 'A4',
      printBackground: true,
    };

    // Generate PDF
    await page.pdf(pdfOptions);

    // Close Puppeteer
    await browser.close();

    return outputPath;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('PDF generation failed');
  }
};



  const generateHtmlTemplate = (data) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Enriched Data Report</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 20px;
          }
          h1 {
              text-align: center;
              margin-bottom: 20px;
          }
          table {
              width: 100%;
              border-collapse: collapse;
              margin: 0 auto;
          }
          th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
          }
          th {
              background-color: #f4f4f4;
          }
          tr:nth-child(even) {
              background-color: #f9f9f9;
          }
      </style>
  </head>
  <body>
      <h1>Data Report</h1>
      <table>
          <thead>
              <tr>
                  <th>Sl. No.</th>
                  <th>Facade Type</th>
                  <th>Sub Type</th>
                  <th>Area (Sqm)</th>
                  <th>RM (m)</th>
                  <th>Glass (Sqm)</th>
                  <th>System (EOI) (Sqm)</th>
              </tr>
          </thead>
          <tbody>
              ${data
                .map(
                  (row, index) => `
              <tr>
                  <td>${index + 1}</td>
                  <td>${row['Facade Type'] || ''}</td>
                  <td>${row['Sub Type'] || ''}</td>
                  <td>${row['Area (Sqm)'] || ''}</td>
                  <td>${row['RM (m)'] || ''}</td>
                  <td>${row['Glass (Sqm)'] || ''}</td>
                  <td>${row['System (EOI) (Sqm)'] || ''}</td>
              </tr>
              `
                )
                .join('')}
          </tbody>
      </table>
  </body>
  </html>`;
  };