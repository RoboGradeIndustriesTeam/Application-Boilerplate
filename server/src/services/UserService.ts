import IUserRegisterDto from "../dto/IUserRegisterDto";
import OUserRegisterDto from "../dto/OUserRegisterDto";
import {User} from "../db";
import {IUserGenerateJwtDto} from "../dto/IUserGenerateJwtDto";
import {OUserGenerateJwt} from "../dto/OUserGenerateJwt";
import {compareSync, genSaltSync, hashSync} from "bcrypt";
import {sign, verify} from "jsonwebtoken";
import UserDto from "../dto/UserDto";
import {UserJWTPayloadDto} from "../dto/UserJWTPayloadDto";
import {IUserLoginDto} from "../dto/IUserLoginDto";
import {OUserLoginDto} from "../dto/OUserLoginDto";
import {OUserFindByID} from "../dto/OUserFindByID";

export default new class {
    async generateJwt(data: IUserGenerateJwtDto): Promise<OUserGenerateJwt> {
        let payload = {
            user_id: data.user._id
        }

        let token = sign(payload, process.env.SECRET || "SECRET");

        return {
            user: data.user,
            jwt: token
        }
    }
    async register(data: IUserRegisterDto): Promise<OUserRegisterDto> {
        let candidate = await User.findOne({login: data.login})

        if (candidate) {
            return {
                status: 400,
                error: "Пользователь с таким логином уже существует",
                user: undefined,
                jwt: undefined
            }
        }

        try {
            let user = await User.create({
                login: data.login,
                password: hashSync(data.password, genSaltSync())
            })

            let jwt = (await this.generateJwt({user})).jwt

            return {
                status: 200,
                error: undefined,
                jwt: jwt,
                user: user
            }
        }
        catch (e) {
            return {
                status: 500,
                error: "Ошибка сервера",
                user: undefined,
                jwt: undefined
            }
        }
    }
    async getUserByToken(token: string): Promise<UserDto | undefined> {
        try {
            let payload: UserJWTPayloadDto = verify(token, process.env.SECRET || "SECRET") as UserJWTPayloadDto

            let candidate = await User.findOne({_id: payload.user_id})

            if (!candidate) return undefined

            return candidate
        }
        catch (e) {
            return undefined
        }
    }
    async getUsers(filter: UserDto | undefined): Promise<UserDto[]> {
        return User.find(filter || {});
    }
    async getUser(id: string): Promise<OUserFindByID> {
        const u = await User.findOne({_id: id})

        if (!u) return {
            user: undefined,
            error: "Пользователь не найден",
            status: 404
        }

        return {
            user: u,
            error: undefined,
            status: 200
        }
    }
    async login(data: IUserLoginDto): Promise<OUserLoginDto> {
        const candidate = await User.findOne({login: data.login})

        if (!candidate) return {
            error: "Не верный логин",
            status: 401,
            user: undefined,
            jwt: undefined
        }

        let is = compareSync(data.password, candidate.password);

        if (!is) return {
            error: "Не верный пароль",
            status: 401,
            user: undefined,
            jwt: undefined
        }

        let token = (await this.generateJwt({user: candidate})).jwt

        return {
            error: undefined,
            status: 200,
            user: candidate,
            jwt: token
        }
    }
}()