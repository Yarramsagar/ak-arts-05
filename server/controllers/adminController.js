const jwt = require('jsonwebtoken');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
  console.warn('Admin credentials or JWT secret missing in environment variables.');
}

const generateToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

// POST /api/admin/login
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken({ id: 'admin', email });
  return res.json({ token });
};
