import { Repository } from "typeorm";
import { User } from "../entity/User";
import { userData } from "../types";
import createHttpError from "http-errors";
import { Roles } from "../constants";
export class UserService {
    constructor(private userRepository: Repository<User>) {}
    async create({ firstName, lastName, email, password }: userData) {
        // const userRepository = AppDataSource.getRepository(User)
        try {
            return await this.userRepository.save({
                firstName,
                lastName,
                email,
                password,
                role: Roles.CUSTOMER,
            });
        } catch (err) {
            const error = createHttpError(
                500,
                "Failed to store data in the database",
            );
            throw error;
        }
    }
}
