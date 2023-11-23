require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const companyRoutes = require("./routes/companies");
const employeeRoutes = require("./routes/employees");
const db = require("./models");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use("/api/companies", companyRoutes);
app.use("/api/employees", employeeRoutes);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use("/api/companies", companyRoutes);
app.use("/api/employees", employeeRoutes);

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).send("Invalid email format");
    }

    // Find user by email
    const user = await db.User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Error on the server.");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
