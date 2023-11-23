const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../models");
const { body, validationResult } = require("express-validator");

// Multer setup for logo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Validation for creating and updating a company
const companyValidationRules = [
  body("name").not().isEmpty().withMessage("Company name is required"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("website").optional().isURL().withMessage("Invalid website URL"),
];

router.post(
  "/",
  upload.single("logo"),
  companyValidationRules,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const logoPath = req.file ? req.file.path : null;
      const company = await db.Company.create({ ...req.body, logo: logoPath });
      res.status(201).json(company);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Get all companies
router.get("/", async (req, res) => {
  try {
    const companies = await db.Company.findAll();
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single company by ID
router.get("/:id", async (req, res) => {
  try {
    const company = await db.Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a company with file upload
router.put(
  "/:id",
  upload.single("logo"),
  companyValidationRules,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const company = await db.Company.findByPk(req.params.id);
      if (!company)
        return res.status(404).json({ message: "Company not found" });

      const logoPath = req.file ? req.file.path : company.logo;
      await company.update({ ...req.body, logo: logoPath });
      res.status(200).json(company);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Delete a company
router.delete("/:id", async (req, res) => {
  try {
    const company = await db.Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    await company.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
