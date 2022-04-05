import UserDto from "./UserDto";

export type OUserLoginDto = {
    error: string | undefined,
    status: number,
    user: UserDto | undefined,
    jwt: string | undefined,
}