import UserDto from "./UserDto";

export type OUserFindByID = {
    status: number,
    error: string | undefined,
    user: UserDto | undefined
}