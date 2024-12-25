import express from "express";
import { AuthController } from "../controllers/AuthController";
import { UserService } from "../services/UserService";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import logger from "../config/logger";

const router = express.Router();

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository); // Creating the dependency
const authController = new AuthController(userService, logger); // Injecting the dependency

// router.post('/register', authController.register) // binding issue., if we write like this it gives binding error (Avoid referencing unbound methods which may cause unintentional scoping of `this`.) the 'this context' will change and this will not refer the class instead it refer here when we use this in AuthController class
router.post("/register", (req, res, next) =>
    authController.register(req, res, next),
);

export default router;
