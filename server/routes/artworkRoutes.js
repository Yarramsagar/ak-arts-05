const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');
const {
  createArtwork,
  getArtworks,
  deleteArtwork,
} = require('../controllers/artworkController');
const authMiddleware = require('../middleware/authMiddleware');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'ak-arts',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext).replace(/\s+/g, '-');
      return `${Date.now()}-${base}`;
    },
  },
});

const upload = multer({ storage });

router.get('/', getArtworks);
router.post('/', authMiddleware, upload.single('image'), createArtwork);
router.delete('/:id', authMiddleware, deleteArtwork);

module.exports = router;
