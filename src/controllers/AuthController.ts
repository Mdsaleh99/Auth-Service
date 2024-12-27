import { NextFunction, Response } from "express";
import { RegisterUserRequest } from "../types";
import { UserService } from "../services/UserService";
import { Logger } from "winston";
import createHttpError from "http-errors";

// AuthController depends on UserService for user-related operations.
// Instead of creating an instance of UserService internally, it is injected into the constructor.
export class AuthController {
    // Dependency is injected here
    // userService: UserService
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {
        // Dependency is injected here
        // this.userService = userService
        // private userService: UserService => this is Dependency is injection and better then above (this.userService = userService, userService: UserService)
    }

    // Controller action to handle user registration
    async register(
        req: RegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
        const { firstName, lastName, email, password } = req.body;
        if (!email) {
            const err = createHttpError(400, "Email is required");
            throw err;
        }

        this.logger.debug("New request to a register user", {
            firstName,
            lastName,
            email,
            password: "******",
        });
        try {
            // Delegate the business logic to the injected userService
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            });

            this.logger.info("User has been registered", { id: user.id });
            res.status(201).json({ id: user.id });
        } catch (err) {
            next(err);
            return;
        }

        // Keep controllers lightweight by handling only framework-related tasks.
        // Move database operations to a separate file to decouple low-level details (like databases) from business logic.
        // The service layer should remain independent of the framework.
        // const userRepository = AppDataSource.getRepository(User)
        // await userRepository.save({firstName, lastName, email, password})
    }
}
