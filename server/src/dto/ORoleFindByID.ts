import {RoleDto} from "./RoleDto";

export type ORoleFindByID = {
    status: number,
    error: string | undefined,
    role: RoleDto | undefined
}