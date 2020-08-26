// "C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const path = require("path");

//Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripePayments");
const paymentBRoutes = require("./routes/payments");

//DB CONNECT
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  });
//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", paymentBRoutes);

//If production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("projfrontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "projfrontend", "build", "index.html")
    );
  });
}

//PORTS
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`running at ${port}`);
});
