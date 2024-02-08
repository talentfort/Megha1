const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;

require("./db/conn");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:3000","http://localhost:3001", "*" ],
  })
);

app.options("*", cors());

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const userRouter = require("./router/userRoute");

app.use(userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Couldn't find the ${req.originalUrl} url`, 404));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
