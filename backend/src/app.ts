import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";

import notesRoutes from "./routes/notes";
import usersRoutes from "./routes/users";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

app.use("/api/users", usersRoutes);
app.use("/api/notes", notesRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found!"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error("Error!");
  let errorMessage = "Internal server error";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
