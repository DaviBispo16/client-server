import express from "express";
const userRouter = express.Router();
import { UserController } from "../controllers/UserController";
import knex from "knex";
import config from "../../knexfile";

export const db = knex(config.development);

const userController = new UserController(db);

userRouter.post("/users", (req, res) => userController.create(req, res));
userRouter.get("/users", (req, res) => userController.getAllUsers(req, res));
userRouter.get("/users/:id", (req, res) => userController.getUserById(req, res));
userRouter.get("/login", (req, res) => userController.loginUser(req, res));

export default userRouter;