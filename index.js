require("dotenv").config();
const cors = require("cors");
const express = require("express");
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");

connectDB();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

//--------Routes---------//

app.use("/signup", require("./routes/api/register"));
app.use("/login", require("./routes/api/login"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/logout", require("./routes/api/logout"));

app.use(verifyJWT);
app.use("/users", require("./routes/api/users"));
app.use("/profile", require("./routes/api/profile"));
app.use("/message", require("./routes/api/message"));
app.use("/messages", require("./routes/api/messages"));
app.use("/logout", require("./routes/api/logout"));
app.use("/user", require("./routes/api/user"));
app.use("/gendered-users", require("./routes/api/gendered-users"));
app.use("/addmatch", require("./routes/api/addmatch"));
app.use("/security-credentials", require("./routes/api/security-credentials"));
app.use("/address", require("./routes/api/address"));
app.use("/read-message", require("./routes/api/read-message"));
app.use("/delete-images", require("./routes/api/delete-images"));
app.use("/update-images", require("./routes/api/update-images"));
app.use("/add-images", require("./routes/api/add-images"));
app.use("/add-activity", require("./routes/api/add-activity"));
app.use("/write-message", require("./routes/api/write-message"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
