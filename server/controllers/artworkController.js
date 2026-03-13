const fs = require('fs');
const path = require('path');
const Artwork = require('../models/Artwork');

// POST /api/artworks
exports.createArtwork = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    if (!title || !category || !req.file) {
      return res
        .status(400)
        .json({ message: 'Title, category, and image are required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

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

    // remove image file if it exists
    const filePath = path.join(
      __dirname,
      '..',
      'uploads',
      path.basename(artwork.imageUrl)
    );
    fs.unlink(filePath, () => {}); // best-effort; ignore errors

    await artwork.deleteOne();
    return res.json({ message: 'Artwork deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
