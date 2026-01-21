const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// exports.register = async (req, res) => {
//   try {
//     const db = req.app.locals.db;
//     const {
//       name, email, password, confirmPassword,
//       gender, type, phone, address, city, country
//     } = req.body;


//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     const existingUser = await db.collection("users").findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "Email already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await db.collection("users").insertOne({
//       name, email, password:hashedPassword,
//       gender, type, phone, address, city, country,
//       createdAt: new Date()
//     });

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const db = req.app.locals.db;
//     const { email, password } = req.body;

//     if (!email || !password) return res.status(400).json({ message: "Email & password required" });

//     const user = await db.collection("users").findOne({ email });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { userId: user._id, email: user.email, type: user.type },
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: { name: user.name, email: user.email, type: user.type }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


const { pool } = require("../utility/dbMySqlConnection");

exports.registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    gender,
    type,
    phone,
    address,
    city,
    country
  } = req.body;


  try {
    // 2️⃣ Check if user already exists
    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Insert user
    await pool.query(
      `INSERT INTO users 
      (name, email, password, gender, type, phone, address, city, country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        hashedPassword,
        gender,
        type,
        phone,
        address,
        city,
        country
      ]
    );

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // 2️⃣ Find user by email
    const [rows] = await pool.query(
      "SELECT id, name, email, password, type FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        type: user.type
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5️⃣ Response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};
