const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.email,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "10m" }
    );
    res.json({ accessToken });
  });
};

const handleNativeAppRefreshToken = async (req, res) => {
  const refreshToken = req.headers.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.email,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "10m" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken, handleNativeAppRefreshToken };
