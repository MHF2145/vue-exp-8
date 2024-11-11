const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Ambil token dari header

    if (!token) {
        return res.status(403).json({ message: 'Token diperlukan' }); // Token tidak ditemukan
    }

    // Verifikasi token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' }); 
        }

        req.user = decoded;  // Simpan informasi user yang terdekripsi dalam request
        next();  // Lanjutkan ke route handler berikutnya
    });
};

module.exports = authMiddleware;
