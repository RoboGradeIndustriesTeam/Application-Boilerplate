import {Role} from "./RoleDto";

type UserDto = {
    _id: string,
    login: string,
    password: string,
    roles: Role[]
}

export default UserDto