const path = require('path');
const Artwork = require('../models/Artwork');
const cloudinary = require('../config/cloudinary');

// POST /api/artworks
exports.createArtwork = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    if (!title || !category || !req.file) {
      return res
        .status(400)
        .json({ message: 'Title, category, and image are required' });
    }

    const imageUrl = req.file.path; // Cloudinary URL

    const artwork = await Artwork.create({
      title,
      category,
      description,
      imageUrl,
    });

    return res.status(201).json(artwork);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/artworks
exports.getArtworks = async (_req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    return res.json(artworks);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// DELETE /api/artworks/:id
exports.deleteArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    // best effort: delete image from Cloudinary
    if (artwork.imageUrl) {
      try {
        const url = new URL(artwork.imageUrl);
        const afterUpload = url.pathname.split('/upload/')[1];
        if (afterUpload) {
          const noVersion = afterUpload.replace(/^v\d+\//, '');
          const publicId = noVersion.replace(path.extname(noVersion), '');
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (err) {
        console.error('Cloudinary delete error:', err.message);
      }
    }

    await artwork.deleteOne();
    return res.json({ message: 'Artwork deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
