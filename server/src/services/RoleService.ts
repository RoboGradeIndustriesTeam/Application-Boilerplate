import {RoleDto} from "../dto/RoleDto"
import {Role} from "../db";
import {ORoleCreateDto} from "../dto/ORoleCreateDto";

export default new (class {
    async getAll(): Promise<RoleDto[]> {
        return Role.find()
    }

    async get(filter: RoleDto | undefined): Promise<RoleDto | undefined> {
        let candidate = await Role.findOne(filter || {})

        return candidate
    }

    async create(data: RoleDto): Promise<ORoleCreateDto | undefined> {
        let candidate = await Role.findOne({system_name: data.system_name})

        if (candidate) return {
            error: "Роль с таким системным именем уже существует",
            role: undefined,
            status: 400
        }

        try {
            let role = await Role.create(data)

            return {
                error: undefined,
                role,
                status: 200
            }
        }
        catch (e) {
            return {
                status: 500,
                error: "Ошибка создания",
                role: undefined
            }
        }
    }
})()