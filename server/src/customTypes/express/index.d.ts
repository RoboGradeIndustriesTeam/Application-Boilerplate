import UserDto from "../../dto/UserDto";

declare namespace Express {
    interface Request {
        user: UserDto;
    }
}