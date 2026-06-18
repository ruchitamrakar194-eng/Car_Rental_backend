const express = require('express');
const upload = require('../config/multer');
const { success } = require('../utils/response');

const router = express.Router();

router.post('/', upload.single('file'), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No file uploaded.' });
    }
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    return success(res, 'File uploaded successfully.', { fileUrl }, 201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
