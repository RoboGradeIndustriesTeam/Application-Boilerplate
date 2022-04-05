import {RoleDto} from "../dto/RoleDto"
import {Role} from "../db";
import {ORoleCreateDto} from "../dto/ORoleCreateDto";
import {ORoleFindByID} from "../dto/ORoleFindByID";
import {IRoleCreateDto} from "../dto/IRoleCreateDto";

export default new (class {
    async getAll(): Promise<RoleDto[]> {
        return Role.find()
    }
    async get(id: string): Promise<ORoleFindByID> {
        let candidate = await Role.findOne({id_: id})

        if (!candidate) {
            return {
                status: 404,
                error: "Роль не найдена",
                role: undefined
            }
        }

        return {
            status: 200,
            error: undefined,
            role: candidate
        }
    }
    async create(data: IRoleCreateDto): Promise<ORoleCreateDto> {
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