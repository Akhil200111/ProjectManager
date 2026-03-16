import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";  //http request logger
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/connectDB.js";

dotenv.config(); //Load env 

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

dbConnection();


app.use(
  cors({
    origin:  "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true, //imp when using cookies, jwt, sessions without this browser refuses to send cookies 
  })
);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); //html form submission

app.use(cookieParser());  //Read cookies sent by the browser

//app.use(morgan("dev"));
app.use("/api", routes);


app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
