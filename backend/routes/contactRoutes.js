// backend/routes/contactRoutes.js
import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // For now, just log the message
  console.log("New contact form submission:", req.body);

  // TODO: send email via nodemailer if needed
  res.status(200).json({ message: "Message received successfully!" });
});

export default router;
