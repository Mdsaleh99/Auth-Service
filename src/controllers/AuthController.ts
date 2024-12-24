import { Response } from "express";
import { RegisterUserRequest } from "../types";
import { UserService } from "../services/UserService";

// AuthController depends on UserService for user-related operations.
// Instead of creating an instance of UserService internally, it is injected into the constructor.
export class AuthController {
    // userService: UserService
    constructor(private userService: UserService) {
        // Dependency is injected here
        // this.userService = userService
    }

    // Controller action to handle user registration
    async register(req: RegisterUserRequest, res: Response) {
        const { firstName, lastName, email, password } = req.body;

        // Delegate the business logic to the injected userService
        await this.userService.create({ firstName, lastName, email, password });

        // Keep controllers lightweight by handling only framework-related tasks.
        // Move database operations to a separate file to decouple low-level details (like databases) from business logic.
        // The service layer should remain independent of the framework.
        // const userRepository = AppDataSource.getRepository(User)
        // await userRepository.save({firstName, lastName, email, password})
        res.status(201).json();
    }
}
