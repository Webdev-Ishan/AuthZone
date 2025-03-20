import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieparser from "cookie-parser";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser()); // for reading cookies, for sending we do not need it
app.use(cors({ credentials: true })); // by this we can send cookies

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
