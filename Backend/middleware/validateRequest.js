import { validationResult } from "express-validator";
import { body } from "express-validator";
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const signupRules = [
  body("name", "Name is required").notEmpty(),
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password must be 6 or more characters").isLength({
    min: 6,
  }),
];

export const loginRules = [
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password is required").exists(),
];

export const dreamRules = [
  body("title", "Title is required").notEmpty(),
  body("description", "Description is required").notEmpty(),
];
