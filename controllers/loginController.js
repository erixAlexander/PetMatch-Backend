const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("🚀 ~ file: loginController.js:7 ~ handleLogin ~ email, password:", email, password)

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    const sanitizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: sanitizedEmail }).exec();

    if (!existingUser) {
      return res.status(409).send("User doesn't exist. Please register.");
    }
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.hashed_password
    );

    if (existingUser && correctPassword) {
      const token = jwt.sign(
        {
          UserInfo: {
            email: existingUser.email,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { email: existingUser.email },
        process.env.REFRESH_TOKEN,
        { expiresIn: "1d" }
      );

      existingUser.refreshToken = refreshToken;
      await existingUser.save();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(201).json({ token, userId: existingUser.user_id });
    }

    if (!correctPassword)
      return res.status(409).send("The password is incorrect.");

    return res.status(400).send("Something went wrong.");
  } catch (error) {
    console.log(error);
  }
};

const handleNativeAppLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(
    "🚀 ~ file: loginController.js:65 ~ handleNativeAppLogin ~ req.body:",
    req.body
  );

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const sanitizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: sanitizedEmail }).exec();

    if (!existingUser) {
      return res.status(409).send("User doesn't exist. Please register.");
    }
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.hashed_password
    );

    if (existingUser && correctPassword) {
      const token = jwt.sign(
        {
          UserInfo: {
            email: existingUser.email,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { email: existingUser.email },
        process.env.REFRESH_TOKEN,
        { expiresIn: "1d" }
      );

      existingUser.refreshToken = refreshToken;
      await existingUser.save();

      res
        .status(201)
        .json({ token, userId: existingUser.user_id, jwt: refreshToken });
      return;
    }
    if (!correctPassword) {
      return res.status(409).send("The password is incorrect.");
    }
    return res.status(400).send("Something went wrong, Incorrect Password.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleLogin, handleNativeAppLogin };
