import express from "express";
import UserService from "../services/UserService";

export default new (class {
    async login(req: express.Request, res: express.Response) {
        let {
            login,
            password
        } = req.body;

        let resp = await UserService.login({login, password})

        if (resp.error) {
            return res.status(resp.status).json({error: resp.error})
        }

        return res.status(resp.status).json({ jwt: resp.jwt, user: resp.user })
    }
    async register(req: express.Request, res: express.Response) {
        let {
            login,
            password
        } = req.body;

        let resp = await UserService.register({login, password})

        if (resp.error) {
            return res.status(resp.status).json({error: resp.error})
        }

        return res.status(resp.status).json({ jwt: resp.jwt, user: resp.user })
    }
    async me(req: express.Request, res: express.Response) {
        return res.status(200).json(req.user)
    }
    async getAll(req: express.Request, res: express.Response) {
        return res.status(200).json(await UserService.getUsers(undefined))
    }
    async get(req: express.Request, res: express.Response) {
        let {
            id,
        } = req.params;

        let resp = await UserService.getUser(id)

        if (resp.error) {
            return res.status(resp.status).json({error: resp.error})
        }

        return res.status(resp.status).json({ user: resp.user })
    }
})()