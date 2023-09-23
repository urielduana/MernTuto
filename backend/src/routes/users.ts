import express from "express";
import * as UserController from "../controllers/user";

const router = express.Router();

router.get("/", UserController.getAuthUser);
router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

export default router;
