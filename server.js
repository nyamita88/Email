console.log("RUNNING EMAIL SERVER FILE RIGHT NOW...");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

let verificationCodes = {};

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nyamitaalex89@gmail.com",
    pass: "bryh zffk jjgu hkvj"
  }
});

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.post("/send-code", async (req, res) => {
  const { email } = req.body;

  const code = generateCode();
  verificationCodes[email] = code;

  try {
    await transporter.sendMail({
      from: "nyamitaalex89@gmail.com",
      to: email,
      subject: "Your Verification Code",
      text: `Your $1 Dollar Foundation verification code is:
      
       ${code} \n\nIMPORTANT: Kindly use this code to complete your registration.
       Do not share this code with anyone!!
       Sylvance Nyamita is about to Hack your Asset coz we're the best of the best in the world of tech and innovation. We are here to empower you with the knowledge and skills to thrive in the digital age. 
       Welcome to the future of learning!`
    });

    res.json({ message: "Code sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

app.post("/verify-code", (req, res) => {
  const { email, code } = req.body;

  if (!verificationCodes[email]) {
    return res.status(400).json({ message: "No code found for this email" });
  }

  if (verificationCodes[email] == code) {
    delete verificationCodes[email];
    return res.json({ message: "Verification successful" });
  } else {
    return res.status(400).json({ message: "Invalid code" });
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

