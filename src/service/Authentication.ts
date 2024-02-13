import { Users } from "../models/Users";
import { UsersRepo } from "../repository/UserRepo";
import Authentication from "../utils/Authentication";


interface IAuthenticationService {
    login(email: string, password: string): Promise<string>;
    register(email: string, password: string, name: string, username: string): Promise<void>;
}

export class AuthenticationService implements IAuthenticationService {
    async login(email: string, password: string): Promise<string> {
        const user = await new UsersRepo().findByEmail(email);
        if (!user) {
            throw new Error("User Not Found!");
        }

        //check pasword
        let compare = await Authentication.passwordCompare(password, user.password);

        if (compare) {
            return Authentication.generateToken(user.id, user.email, user.name, user.username);
        }
        return "";
    }

    async register(email: string, password: string, name: string, username: string): Promise<void> {
        try {
            const hashedPassword: string = await Authentication.passwordHash(password)
            const new_user = new Users()
            new_user.email = email
            new_user.password = hashedPassword
            new_user.username = username
            new_user.name = name

            await new UsersRepo().save(new_user)
        } catch (e) {
            throw new Error("Error Register!");
        }
    }
}