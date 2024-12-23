import express from 'express';
import multer from 'multer';

import { csvToXlsx } from '../controllers/csv-to-xlsx.controller.js';

const router = express.Router();

// Set up multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.array('files', 2),csvToXlsx );

export default router;