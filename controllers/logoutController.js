const User = require("../model/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  console.log("🚀 ~ file: logoutController.js:5 ~ handleLogout ~ cookies:", cookies)
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

const handleNativeAppLogout = async (req, res) => {
  const refreshToken = req.header.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.status(204).send("Clear cookies");
    return;
  }

  foundUser.refreshToken = "";
  await foundUser.save();
  res.status(204).send("Clear cookies");
};

module.exports = { handleLogout, handleNativeAppLogout };
