const User = require("../model/User");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate)
      return res.status(409).send("User already exists. Please Login.");
    const sanitizedEmail = email.toLowerCase();

    const token = jwt.sign(
      {
        UserInfo: {
          email: sanitizedEmail,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { email: sanitizedEmail },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );

    const data = {
      email: sanitizedEmail,
      hashed_password: hashedPassword,
      user_id: generatedUserId,
      refreshToken,
    };

    await User.create(data);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ token, userId: generatedUserId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleNativeAppRegister = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate)
      return res.status(409).send("User already exists. Please Login.");
    const sanitizedEmail = email.toLowerCase();

    const token = jwt.sign(
      {
        UserInfo: {
          email: sanitizedEmail,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { email: sanitizedEmail },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );

    const data = {
      email: sanitizedEmail,
      hashed_password: hashedPassword,
      user_id: generatedUserId,
      refreshToken,
    };

    await User.create(data);

    res.status(201).json({ token, userId: generatedUserId, jwt: refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleRegister, handleNativeAppRegister };
