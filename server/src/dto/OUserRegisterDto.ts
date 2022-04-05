import UserDto from "./UserDto";

type OUserRegisterDto = {
    status: number,
    error: string | undefined,
    user: UserDto | undefined,
    jwt: string | undefined
}

export default OUserRegisterDto