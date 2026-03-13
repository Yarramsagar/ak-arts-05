const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  createArtwork,
  getArtworks,
  deleteArtwork,
} = require('../controllers/artworkController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const upload = multer({ storage });

router.get('/', getArtworks);
router.post('/', authMiddleware, upload.single('image'), createArtwork);
router.delete('/:id', authMiddleware, deleteArtwork);

module.exports = router;
