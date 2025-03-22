import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieparser from "cookie-parser";
import DBconnect from "./Config/mongodb.js";
import authRouter from "./routes/auth.Routes.js";
import userRouter from "./routes/user.Routes.js";
const app = express();
const port = process.env.PORT || 4000;
DBconnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser()); // for reading cookies, for sending we do not need it
app.use(cors({ credentials: true })); // by this we can send cookies

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
