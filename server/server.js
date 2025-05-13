const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const shopOrderRouter = require("./routes/shop/order-routes"); 
const adminProductsRouter = require("./routes/admin/products-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");
const paymentRouter = require("./routes/shop/payment-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const mentorRouter = require('./routes/mentor');
const mentorshipRouter = require('./routes/mentorship');
const tryonRoutes = require('./routes/shop/tryon-routes'); 
// const fileUpload = require('express-fileupload');
// const pixelcutRouter = require('./routes/shop/pixelcut-routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI )
  .then(() => console.log("Connected to DATABASE"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
// app.use('/api/shop/pixelcut', pixelcutRouter); // Add this line to include the Pixelcut routes
app.use('/api/shop', tryonRoutes);
// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: '/tmp/',
// }));
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);
app.use("/api/shop/payment", paymentRouter);
app.use('/api/mentor', mentorRouter);
app.use('/api/mentorship', mentorshipRouter);


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
