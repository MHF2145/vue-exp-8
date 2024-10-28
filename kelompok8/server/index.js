require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Tempat menyimpan user sementara (gunakan database pada production)
const users = [];

// Secret key untuk JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Endpoint Register
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
});

// Endpoint Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Buat JWT
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});

// Middleware untuk validasi token
function authenticateToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Endpoint Protected (hanya bisa diakses dengan token yang valid)
app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Welcome to the protected route!" });
});

// Jalankan server
app.listen(3000, () => {
    console.log("Backend berjalan di http://localhost:3000");
});
