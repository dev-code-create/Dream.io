import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorizaation &&
    req.headers.authorizaation.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.user.id).select("-password");
      next();
    } catch (err) {
      console.error(err.message);
      res.status(401).json({ message: "Not authorized ,Token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized,No token" });
  }
};
