import express from "express";
import {
  getUserCreation,
  getPublishedCreation,
  toggleLikeCreation,
} from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/get-user-creation", auth, getUserCreation);

userRouter.get("/get-published-creations", auth, getPublishedCreation);

userRouter.post("/toggle-like-creation", auth, toggleLikeCreation);

export default userRouter;