import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api, { setAuthToken } from '../api';
import ArtworkGrid from '../components/ArtworkGrid';

const categories = [
  'Blood Arts',
  'Sketch Arts',
  'Pencil Arts',
  'Paintings',
  'Portraits',
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    category: categories[0],
    description: '',
    image: null,
  });
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // set token on load
  useEffect(() => {
    const token = localStorage.getItem('akarts_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    setAuthToken(token);
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const { data } = await api.get('/artworks');
      setArtworks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load artworks');
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      await api.delete(`/artworks/${id}`);
      setArtworks((prev) => prev.filter((art) => art._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files ? files[0] : null;
    setForm((prev) => ({
      ...prev,
      [name]: file || value,
    }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrag = (e, active) => {
    e.preventDefault();
    setDragActive(active);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.image) {
      setError('Please add an image.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('image', form.image);

    try {
      const { data } = await api.post('/artworks', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setArtworks((prev) => [data, ...prev]);
      setForm({
        title: '',
        category: categories[0],
        description: '',
        image: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <div className="section-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h2>Dashboard</h2>
        </div>
        <button
          className="btn secondary"
          onClick={() => {
            localStorage.removeItem('akarts_token');
            setAuthToken(null);
            navigate('/admin/login');
          }}
        >
          Logout
        </button>
      </div>

      <div className="panel-grid">
        <div className="panel">
          <h3>Upload Artwork</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Title
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Category
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
              />
            </label>
            <div
              className={dragActive ? 'dropzone active' : 'dropzone'}
              onDragEnter={(e) => handleDrag(e, true)}
              onDragOver={(e) => handleDrag(e, true)}
              onDragLeave={(e) => handleDrag(e, false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <img src={preview} alt="preview" className="dropzone-preview" />
              ) : (
                <>
                  <p className="dropzone-title">Drag & Drop Artwork Here</p>
                  <p className="muted">or click to upload</p>
                </>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChange}
                hidden
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button className="btn primary" type="submit" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Artworks</h3>
            <button className="btn ghost" onClick={fetchArtworks}>
              Refresh
            </button>
          </div>
          {artworks.length ? (
            <>
              <ArtworkGrid artworks={artworks} />
              <div className="art-delete-list">
                {artworks.map((art) => (
                  <div key={art._id} className="art-delete-row">
                    <div>
                      <strong>{art.title}</strong>
                      <span className="tag">{art.category}</span>
                    </div>
                    <button
                      className="btn ghost"
                      onClick={() => handleDelete(art._id)}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="muted">No artworks yet.</p>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default AdminDashboard;
