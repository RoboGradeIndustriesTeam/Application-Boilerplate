import {RoleDto} from "./RoleDto";

export type ORoleCreateDto = {
    role: RoleDto | undefined,
    error: string | undefined,
    status: number
}