const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const handleLogin = async (req, res) => {
  
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
  
    try {
      const existingUser = await User.findOne({ email: email }).exec();
  
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

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure:true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(201).json({ token, userId: existingUser.user_id });
        return;
      }
      if (!correctPassword) res.status(409).send("The password is incorrect.");

      res.status(400).send("Something went wrong.");

    } catch (error) {
      console.log(error);
    } 
  }

  module.exports = { handleLogin };