const express = require("express");
const router = express.Router();
const db = require("../models");
const { body, validationResult } = require("express-validator");

// Validation rules for employee
const employeeValidationRules = [
  body("firstName").not().isEmpty().withMessage("First name is required"),
  body("lastName").not().isEmpty().withMessage("Last name is required"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number format"),
  body("companyId")
    .optional()
    .custom(async (value) => {
      if (value) {
        const company = await db.Company.findByPk(value);
        if (!company) {
          return Promise.reject("Company not found");
        }
      }
    }),
];

//create employee
router.post("/", employeeValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const employee = await db.Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await db.Employee.findAll({
      include: [{ model: db.Company, as: "company" }],
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await db.Employee.findByPk(req.params.id, {
      include: [{ model: db.Company, as: "company" }],
    });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an employee
router.put("/:id", employeeValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const employee = await db.Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.update(req.body);
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await db.Employee.findByPk(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    await employee.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
